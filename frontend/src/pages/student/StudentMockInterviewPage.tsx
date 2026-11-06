import React, { useState } from 'react';
import { aiApi } from '../../api/aiApi';
import { MockInterviewEvaluation, MockInterviewQuestions } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  MessageSquare,
  Sparkles,
  Award,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  RefreshCw,
} from 'lucide-react';

export const StudentMockInterviewPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('Full Stack Java Developer');
  const [session, setSession] = useState<MockInterviewQuestions | null>(null);
  const [answers, setAnswers] = useState<{ [qNum: number]: string }>({});
  const [evaluation, setEvaluation] = useState<MockInterviewEvaluation | null>(null);

  const [generating, setGenerating] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roles = [
    'Full Stack Java Developer',
    'Cloud Systems & DevOps Engineer',
    'Distributed Backend Engineer',
    'Frontend React Specialist',
  ];

  const handleGenerateQuestions = async () => {
    setGenerating(true);
    setError(null);
    setEvaluation(null);
    setAnswers({});

    try {
      const data = await aiApi.generateMockQuestions(selectedRole);
      setSession(data);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to generate mock interview questions.');
    } finally {
      setGenerating(false);
    }
  };

  const handleAnswerChange = (qNum: number, text: string) => {
    setAnswers((prev) => ({ ...prev, [qNum]: text }));
  };

  const handleSubmitAnswers = async () => {
    if (!session) return;
    setEvaluating(true);
    setError(null);

    const formatted = session.questions.map((q) => ({
      questionNumber: q.questionNumber,
      studentAnswer: answers[q.questionNumber] || '',
    }));

    try {
      const result = await aiApi.evaluateMockInterview(session.sessionId, formatted);
      setEvaluation(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to evaluate interview answers.');
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Interview Simulator</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            AI Placement Mock Interview
          </h1>
          <p className="text-xs text-slate-500">
            Simulate technical and architectural interview rounds tailored to your target company role
          </p>
        </div>

        {/* Generate / Start New Session */}
        <div className="flex items-center gap-2">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            disabled={generating}
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800 shadow-sm"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerateQuestions}
            disabled={generating}
            className="px-4 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50 flex-shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${generating ? 'animate-spin' : ''}`} />
            <span>{generating ? 'Drafting...' : 'Start New Session'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Evaluation Results Banner (If Submitted) */}
      {evaluation && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Evaluation Complete
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {evaluation.targetRole} Performance Review
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-lg leading-relaxed">
                {evaluation.overallFeedback}
              </p>
            </div>

            <div className="w-24 h-24 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col items-center justify-center font-extrabold text-slate-900 flex-shrink-0">
              <span className="text-3xl leading-none">{evaluation.overallScore}%</span>
              <span className="text-[10px] uppercase font-bold text-amber-700 mt-1">Score</span>
            </div>
          </div>

          {/* Feedback on each answer */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Per-Question Rubric Breakdown
            </h3>
            {evaluation.questionReviews.map((rev) => (
              <div
                key={rev.questionNumber}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-amber-700">
                      Q{rev.questionNumber} • {rev.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                      {rev.questionText}
                    </h4>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-slate-900 border border-slate-200">
                    {rev.score}/100
                  </span>
                </div>

                {/* Student Answer */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Your Response
                  </span>
                  <p className="text-slate-700 italic">
                    {rev.studentAnswer ? `"${rev.studentAnswer}"` : '(No response provided)'}
                  </p>
                </div>

                {/* AI Feedback */}
                <div className="text-xs text-slate-700 space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>AI Feedback</span>
                  </div>
                  <p className="leading-relaxed pl-5">{rev.feedback}</p>
                </div>

                {/* Model Answer Guidance */}
                <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                  <span className="font-bold block mb-0.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Recommended Technical Talking Points</span>
                  </span>
                  <p className="text-emerald-900 leading-relaxed">{rev.modelAnswer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleGenerateQuestions}
              className="px-6 py-2.5 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-all shadow-sm"
            >
              Start Another Mock Interview Round
            </button>
          </div>
        </div>
      )}

      {/* Active Session Questions */}
      {!evaluation && session && (
        <div className="space-y-6">
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 text-xs text-amber-900">
            <p className="font-semibold">
              Live Mock Interview for <span className="font-bold">{session.targetRole}</span>
            </p>
            <p className="text-amber-700 mt-0.5">
              Type your answers in the input boxes below. When ready, click "Submit All Answers for AI Evaluation".
            </p>
          </div>

          <div className="space-y-5">
            {session.questions.map((q) => (
              <div
                key={q.questionNumber}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-400 font-extrabold text-xs text-slate-950 flex items-center justify-center">
                      Q{q.questionNumber}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {q.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                        {q.questionText}
                      </h3>
                    </div>
                  </div>
                </div>

                {q.tips && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>Interviewer Hint: {q.tips}</span>
                  </div>
                )}

                <textarea
                  rows={4}
                  placeholder="Type your explanation here. Mention architecture, code patterns, and trade-offs..."
                  value={answers[q.questionNumber] || ''}
                  onChange={(e) => handleAnswerChange(q.questionNumber, e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all text-slate-800 font-sans"
                />
              </div>
            ))}
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-slate-500">
              {Object.keys(answers).length} of {session.questions.length} questions answered
            </span>
            <button
              onClick={handleSubmitAnswers}
              disabled={evaluating}
              className="px-7 py-3 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {evaluating ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Submit All Answers for AI Evaluation</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Initial Landing State before starting */}
      {!session && !evaluation && !generating && (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Ready to Test Your Engineering Acumen?
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Select your preferred role above and click <strong>"Start New Session"</strong>. The AI
            engine will generate five practical technical, problem-solving, and system design
            questions to evaluate your readiness.
          </p>
          <button
            onClick={handleGenerateQuestions}
            className="px-6 py-3 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-all shadow-sm inline-flex items-center gap-2"
          >
            <span>Launch Mock Interview for {selectedRole}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};


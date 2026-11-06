import React, { useState, useEffect } from 'react';
import { tpoApi } from '../../api/tpoApi';
import { PlacementAnnouncement } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Modal } from '../../components/common/Modal';
import { Megaphone, Plus, Pin, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const TpoAnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<PlacementAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('ALL');
  const [pinned, setPinned] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const data = await tpoApi.getAnnouncements();
      setAnnouncements(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await tpoApi.createAnnouncement({ title, content, targetAudience, pinned });
      setShowModal(false);
      setTitle('');
      setContent('');
      setPinned(false);
      fetchAnnouncements();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading announcements..." size="lg" />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Placement Announcements
          </h1>
          <p className="text-xs text-slate-500">
            Broadcast official notices, schedule changes, and recruitment deadlines
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>New Notice</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-2xl border shadow-sm space-y-3 transition-all ${
              ann.pinned ? 'bg-amber-50/40 border-amber-300' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                {ann.pinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Target: {ann.targetAudience}
                </span>
              </div>

              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {new Date(ann.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{ann.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                {ann.content}
              </p>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100">
              Published by: <span className="font-semibold text-slate-700">{ann.authorName}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Broadcast Placement Announcement"
        subtitle="Deliver notification to registered students and recruiters"
        maxWidth="lg"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Google Summer Internship 2027 Registration Open"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-700"
              >
                <option value="ALL">All Users</option>
                <option value="STUDENTS">Students Only</option>
                <option value="RECRUITERS">Recruiters Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="pinNotice"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
              />
              <label htmlFor="pinNotice" className="text-xs font-semibold text-slate-700">
                Pin to top of feed
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notice Content
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Announcement details, eligibility reminders, deadlines..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-all shadow-sm"
            >
              {saving ? 'Publishing...' : 'Publish Announcement'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


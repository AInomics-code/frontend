import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Search, Filter, Send, AtSign, Hash } from 'lucide-react';
import ContextPanel from '@/components/ContextPanel';
import { ToastContainer } from '@/components/Toast';
import { parseChips, teamMembers } from '@/data/entities';

// Smart chip component
const SmartChip = ({ type, value, id, onClick }: { type: string; value: string; id: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-500/12 border border-blue-500/35 text-blue-200 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200 hover:shadow-glow-blue"
    style={{
      boxShadow: '0 0 0 rgba(77,163,255,0)',
      transition: 'box-shadow 180ms ease-out'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 0 24px rgba(77,163,255,0.25)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 0 0 rgba(77,163,255,0)';
    }}
  >
    #{type}:{value}
  </button>
);

// Comment thread card component
const CommentCard = ({ comment, onOpenContext }: { comment: any; onOpenContext: (type: string, id: string) => void }) => {
  const chips = parseChips(comment.content);
  const member = teamMembers.find(m => m.name === comment.author);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/68 backdrop-blur-sm border border-white/6 rounded-2xl p-6 shadow-2xl"
      style={{
        background: 'rgba(16,24,43,.68)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 24px rgba(0,0,0,.35)'
      }}
    >
      {/* Header with avatar and info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
            <span className="text-sm font-semibold text-blue-300">{comment.avatar}</span>
          </div>
          {member?.online && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-slate-900"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-white tracking-wide">{comment.author}</h4>
            <span className="text-xs text-blue-300 font-medium">{comment.role}</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{comment.time}</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <p className="text-slate-300 leading-relaxed">{comment.content}</p>
        
        {/* Smart chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, index) => (
              <SmartChip
                key={index}
                type={chip.type}
                value={chip.value}
                id={chip.id}
                onClick={() => onOpenContext(chip.type, chip.id)}
              />
            ))}
          </div>
        )}

        {/* Quick actions */}
        <div className="flex items-center space-x-2 pt-2">
          <button
            onClick={() => onOpenContext('report', 'q3-forecast')}
            className="text-xs px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 hover:scale-105"
          >
            Open Report
          </button>
          <button
            onClick={() => onOpenContext('kpi', 'performance-score')}
            className="text-xs px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 hover:scale-105"
          >
            Open KPI
          </button>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('create-task', { detail: { title: `Follow up on ${comment.author}'s comment` } }));
              window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Task created', type: 'success' } }));
            }}
            className="text-xs px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 hover:scale-105"
          >
            Create Task
          </button>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('simulate', { detail: { entity: 'comment', id: comment.id } }));
              window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Scenario queued', type: 'info' } }));
            }}
            className="text-xs px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg text-amber-300 hover:text-amber-200 transition-all duration-200 hover:scale-105 border border-amber-500/30"
          >
            Simulate
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Collaboration() {
  const [, setLocation] = useLocation();
  const [newComment, setNewComment] = useState('');
  const [contextPanel, setContextPanel] = useState<{ isOpen: boolean; entityId: string | null; activeTab: string }>({
    isOpen: false,
    entityId: null,
    activeTab: 'overview'
  });
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Enhanced sample comments with smart chips
  const [comments] = useState([
    {
      id: 1,
      author: 'Elena Rodriguez',
      role: 'Sales Director',
      time: '2 hours ago',
      content: 'The #kpi:Performance Score analysis for #zone:Chiriquí looks concerning. We need to prioritize emergency transfer for #product:Mango Salsa tomorrow morning. Can we review the #report:Q3 Forecast impact?',
      avatar: 'ER'
    },
    {
      id: 2,
      author: 'Miguel Santos',
      role: 'Operations Manager',
      time: '1 hour ago',
      content: '@elena The David warehouse has confirmed 4,800 units available. I can coordinate the 6-hour transit route. Should we also review #kpi:Inventory Turnover levels for other locations?',
      avatar: 'MS'
    },
    {
      id: 3,
      author: 'Sofia Chen',
      role: 'Analytics Lead',
      time: '45 minutes ago',
      content: 'I\'ve updated the forecasting parameters for #product:Mango Salsa. The 1.8x promotional multiplier has been applied to #zone:Chiriquí. We should see better predictions for similar seasonal events.',
      avatar: 'SC'
    }
  ]);

  const openContextPanel = (type: string, id: string, tab = 'overview') => {
    setContextPanel({ isOpen: true, entityId: id, activeTab: tab });
  };

  const closeContextPanel = () => {
    setContextPanel({ isOpen: false, entityId: null, activeTab: 'overview' });
  };

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    // Here you would normally add the comment to the list
    setNewComment('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const handleInputChange = (value: string) => {
    setNewComment(value);
    
    // Check for mentions
    const mentionMatch = value.match(/@([a-zA-Z]*)$/);
    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
      setShowMentions(true);
    } else {
      setShowMentions(false);
      setMentionQuery('');
    }
  };

  const insertMention = (member: any) => {
    const mentionText = `@${member.name.toLowerCase().replace(' ', '')} `;
    const beforeMention = newComment.replace(/@[a-zA-Z]*$/, '');
    setNewComment(beforeMention + mentionText);
    setShowMentions(false);
    inputRef.current?.focus();
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white font-sans flex">
      
      {/* Left Sidebar */}
      <div className="fixed left-4 top-4 bottom-4 w-16 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl flex flex-col items-center py-6 z-10">
        {/* Top Icon - Dashboard/Home */}
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col space-y-4">
          <button 
            onClick={() => setLocation('/dashboard')}
            className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          <button className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Collaboration Hub - Highlighted */}
          <button className="w-10 h-10 rounded-xl bg-blue-500/30 border border-blue-500/50 flex items-center justify-center transition-all duration-200">
            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          <button className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <button className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Bottom Icon - User/Profile */}
        <div className="mt-auto">
          <button className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-24">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 40px' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-semibold text-white mb-2 tracking-wide" style={{ color: '#4DA3FF', letterSpacing: '1px', fontWeight: 600 }}>
              Collaboration Hub
            </h1>
            <p className="text-slate-400">Connect insights to action through intelligent team collaboration</p>
          </motion.div>

          {/* Sticky Sub-Header */}
          <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-8">
            <div className="flex items-center justify-between gap-4">
              {/* Filters */}
              <div className="flex items-center space-x-2">
                {['All', 'Mentions', 'Unread'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeFilter === filter
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 w-64"
                  />
                </div>

                {/* Counter */}
                <div className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <span className="text-sm font-medium text-blue-300">3 new</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-6 mb-8">
            {comments.map((comment, index) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onOpenContext={openContextPanel}
              />
            ))}
          </div>

          {/* Enhanced Composer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
            style={{
              background: 'rgba(16,24,43,.68)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,.35)',
              padding: '24px'
            }}
          >
            {/* Mention Dropdown */}
            {showMentions && (
              <div className="absolute bottom-full left-6 mb-2 w-64 bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-30">
                <div className="p-2">
                  <div className="text-xs text-slate-400 mb-2 px-2">Mention team member</div>
                  {filteredMembers.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => insertMention(member)}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-300">{member.avatar}</span>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">{member.name}</div>
                        <div className="text-xs text-slate-400">{member.role}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={newComment}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share insights, tag entities with #kpi:name, mention @teammates..."
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 text-white placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 min-h-[100px]"
                />
                
                {/* Suggestion chips */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                  <button className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
                    <AtSign className="w-3 h-3 inline mr-1" />
                    @mention
                  </button>
                  <button className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
                    <Hash className="w-3 h-3 inline mr-1" />
                    #tag
                  </button>
                  <button className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
                    /commands
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleSendComment}
                className="px-6 py-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 font-medium transition-all duration-200 hover:scale-105 hover:shadow-glow-blue flex items-center space-x-2"
                style={{
                  boxShadow: '0 0 0 rgba(77,163,255,0)',
                  transition: 'all 180ms ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(77,163,255,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 rgba(77,163,255,0)';
                }}
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Context Panel */}
      <ContextPanel
        isOpen={contextPanel.isOpen}
        onClose={closeContextPanel}
        entityId={contextPanel.entityId}
        activeTab={contextPanel.activeTab}
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'wouter';

export default function Collaboration() {
  const [, setLocation] = useLocation();
  const [newComment, setNewComment] = useState('');

  // Sample comments data
  const [comments] = useState([
    {
      id: 1,
      author: 'Elena Rodriguez',
      role: 'Sales Director',
      time: '2 hours ago',
      content: 'The stockout analysis for Chiriquí Central looks concerning. We need to prioritize the emergency transfer tomorrow morning.',
      avatar: 'E'
    },
    {
      id: 2,
      author: 'Miguel Santos',
      role: 'Operations Manager',
      time: '1 hour ago',
      content: '@elena The David warehouse has confirmed 4,800 units available. I can coordinate the 6-hour transit route. Should we also review safety stock levels for other locations?',
      avatar: 'M'
    },
    {
      id: 3,
      author: 'Sofia Chen',
      role: 'Business Analyst',
      time: '45 minutes ago',
      content: 'I\'ve updated the forecasting parameters. The 1.8x promotional multiplier has been applied. We should see better predictions for similar seasonal events.',
      avatar: 'S'
    }
  ]);

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
      <div className="flex-1 pl-24 pr-8 py-10">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-1 mb-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-wide text-[#CBD5E1]">Collaboration Hub</h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
              Discuss insights, tag team members, and assign tasks — all within the same space.
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6">
            
            {/* Comments Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-200">Team Discussion</h2>
              <div className="text-sm text-slate-400">{comments.length} comments</div>
            </div>

            {/* Comments List */}
            <div className="space-y-6 mb-6">
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 font-semibold">
                      {comment.avatar}
                    </div>
                    
                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-slate-200 font-medium">{comment.author}</h3>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-400">{comment.role}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-400">{comment.time}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* New Comment Input */}
            <div className="border-t border-slate-700/30 pt-6">
              <div className="flex items-start gap-3">
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-300 font-semibold">
                  U
                </div>
                
                {/* Input Section */}
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a comment..."
                    rows={3}
                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
                  />
                  
                  {/* Send Button */}
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleSendComment}
                      disabled={!newComment.trim()}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-600 disabled:to-slate-600 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
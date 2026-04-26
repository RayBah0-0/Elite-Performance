import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('board'); // 'board' or 'list'

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const loadLeads = async () => {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching leads from Supabase, falling back to local storage:", error);
      const savedLeads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
      setLeads(savedLeads);
    } else {
      setLeads(data || []);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'elite2026';
    if (password === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password');
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    // Optimistic UI update
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    if (error) {
      console.error("Error updating lead status:", error);
      // Fallback local storage logic
      const savedLeads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
      const updated = savedLeads.map(l => l.id === id ? { ...l, status: newStatus } : l);
      localStorage.setItem('crm_leads', JSON.stringify(updated));
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(l => l.id !== id));
      
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) {
        console.error("Error deleting lead:", error);
        // Fallback local storage
        const savedLeads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
        localStorage.setItem('crm_leads', JSON.stringify(savedLeads.filter(l => l.id !== id)));
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0A0A0C]">
        <form onSubmit={handleLogin} className="bg-[#131315] p-8 rounded-2xl border border-white/10 w-96 shadow-2xl shadow-blue-900/20">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <img src="/Logo.PNG" alt="Logo" className="w-full h-full object-contain filter drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white italic leading-tight">EP Sports</h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">CRM Access</p>
            </div>
          </div>
          <input 
            type="password" 
            placeholder="Enter Admin Pin" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1c1b1d] border border-white/10 rounded-xl px-4 py-3 text-white mb-6 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-center tracking-widest"
          />
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
            Secure Login
          </button>
        </form>
      </div>
    );
  }

  const columns = ['New', 'Contacted', 'Paid', 'Lost'];
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const paidLeadsCount = leads.filter(l => l.status === 'Paid').length;
  const conversionRate = leads.length > 0 ? Math.round((paidLeadsCount / leads.length) * 100) : 0;
  
  // Real revenue calculation (rough estimate based on known plan prices)
  const calculateRevenue = () => {
    return leads.filter(l => l.status === 'Paid').reduce((total, lead) => {
      if (lead.program === '1x Weekly Training') return total + 149;
      if (lead.program === '2x Weekly Training') return total + 249;
      return total + 200; // default average
    }, 0);
  };

  return (
    <div className="bg-[#0A0A0C] text-slate-300 min-h-screen font-['Inter'] flex">
      
      {/* Smart Sidebar */}
      <aside className="w-20 md:w-64 flex-shrink-0 bg-[#0e0e10] border-r border-white/5 flex flex-col h-screen sticky top-0">
        <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-white/5">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/Logo.PNG" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="hidden md:block ml-3 font-black text-white italic text-lg tracking-tight">EP CRM</span>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          <button 
            onClick={() => setActiveTab('board')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'board' ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'}`}
          >
            <span className="material-symbols-outlined">view_kanban</span>
            <span className="hidden md:block font-bold text-sm">Lead Board</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('list')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'list' ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'}`}
          >
            <span className="material-symbols-outlined">list_alt</span>
            <span className="hidden md:block font-bold text-sm">All Athletes</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="hidden md:block font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Canvas */}
      <main className="flex-1 overflow-x-hidden flex flex-col h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-[#0e0e10]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 flex-shrink-0 sticky top-0 z-40">
          <div>
            <h2 className="text-2xl font-black text-white italic tracking-tight font-['Lexend']">Pipeline Overview</h2>
            <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-1">Real-time Lead Management</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-500 tracking-wide">System Online</span>
            </div>
          </div>
        </header>

        <div className="p-8 flex-1 overflow-y-auto">
          {/* Dynamic Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            <div className="bg-[#131315] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <span className="material-symbols-outlined">group_add</span>
                </div>
              </div>
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Pipeline</h3>
              <p className="text-3xl font-black text-white font-['Lexend']">{leads.length}</p>
            </div>

            <div className="bg-[#131315] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-600/10 blur-3xl rounded-full"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <span className="material-symbols-outlined">payments</span>
                </div>
              </div>
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Closed Won (MRR)</h3>
              <p className="text-3xl font-black text-white font-['Lexend']">${calculateRevenue()}</p>
            </div>

            <div className="bg-[#131315] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-600/10 blur-3xl rounded-full"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <span className="material-symbols-outlined">mark_email_unread</span>
                </div>
                {newLeadsCount > 0 && (
                  <span className="bg-amber-500 text-[#0A0A0C] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Action Needed</span>
                )}
              </div>
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">New Inquiries</h3>
              <p className="text-3xl font-black text-white font-['Lexend']">{newLeadsCount}</p>
            </div>

            <div className="bg-[#131315] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-600/10 blur-3xl rounded-full"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
              </div>
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Conversion Rate</h3>
              <p className="text-3xl font-black text-white font-['Lexend']">{conversionRate}%</p>
            </div>

          </div>

          {/* Kanban Board View */}
          {activeTab === 'board' && (
            <div className="flex gap-6 overflow-x-auto pb-8 h-full">
              {columns.map(status => {
                const columnLeads = leads.filter(lead => lead.status === status);
                
                // Color coding for columns
                let headerColor = 'border-slate-500';
                let dotColor = 'bg-slate-500';
                if (status === 'New') { headerColor = 'border-amber-500'; dotColor = 'bg-amber-500'; }
                if (status === 'Contacted') { headerColor = 'border-blue-500'; dotColor = 'bg-blue-500'; }
                if (status === 'Paid') { headerColor = 'border-emerald-500'; dotColor = 'bg-emerald-500'; }
                if (status === 'Lost') { headerColor = 'border-red-500'; dotColor = 'bg-red-500'; }

                return (
                  <div key={status} className="flex-1 min-w-[320px] max-w-[400px] flex flex-col bg-[#131315]/50 border border-white/5 rounded-2xl p-4">
                    {/* Column Header */}
                    <div className={`flex items-center justify-between mb-4 pb-3 border-b-2 ${headerColor}`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">{status}</h3>
                      </div>
                      <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded-lg">{columnLeads.length}</span>
                    </div>
                    
                    {/* Leads Cards */}
                    <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar flex-1 pr-1">
                      {columnLeads.map(lead => (
                        <div key={lead.id} className="bg-[#1c1b1d] border border-white/5 p-5 rounded-xl hover:border-white/20 transition-all cursor-default group relative shadow-lg">
                          
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-white font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors">{lead.athleteName}</h4>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={() => deleteLead(lead.id)} className="text-slate-500 hover:text-red-500 p-1">
                                  <span className="material-symbols-outlined text-sm">delete</span>
                               </button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                              <span className="material-symbols-outlined text-[14px]">person</span>
                              <span>Parent: <span className="text-slate-300 font-medium">{lead.parentName}</span></span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                              <span className="material-symbols-outlined text-[14px]">mail</span>
                              <span className="truncate">{lead.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                              <span className="material-symbols-outlined text-[14px]">school</span>
                              <span>Grade: <span className="text-slate-300 font-medium">{lead.grade || 'N/A'}</span></span>
                            </div>
                            {lead.practiceDay && lead.practiceDay !== 'N/A' && (
                              <div className="flex items-center gap-2 text-slate-400 text-xs">
                                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                <span>Practice: <span className="text-emerald-400 font-bold">{lead.practiceDay}</span></span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                              <span className="material-symbols-outlined text-[14px]">fitness_center</span>
                              <span className="text-blue-400 font-bold">{lead.program}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                              {new Date(lead.created_at || lead.date || Date.now()).toLocaleDateString()}
                            </span>
                            
                            <select 
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className="text-xs font-bold bg-[#0A0A0C] border border-white/10 text-white rounded-lg px-2 py-1 outline-none focus:border-blue-500 cursor-pointer"
                            >
                              {columns.map(col => <option key={col} value={col}>{col}</option>)}
                            </select>
                          </div>
                        </div>
                      ))}
                      
                      {columnLeads.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-white/5 rounded-xl">
                          <span className="material-symbols-outlined text-slate-600 text-3xl mb-2">inbox</span>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">No Leads</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* List View */}
          {activeTab === 'list' && (
            <div className="bg-[#131315] border border-white/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/5">
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Athlete / Grade</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Parent Details</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Program / Day</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {new Date(lead.created_at || lead.date || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-white">{lead.athleteName}</p>
                          <p className="text-xs text-slate-500">{lead.grade || 'N/A'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-300">{lead.parentName}</p>
                          <p className="text-xs text-slate-500">{lead.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                            {lead.program}
                          </span>
                          {lead.practiceDay && lead.practiceDay !== 'N/A' && (
                            <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-tighter">Day: {lead.practiceDay}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className={`text-xs font-bold bg-[#0A0A0C] border border-white/10 rounded-lg px-3 py-1.5 outline-none cursor-pointer
                              ${lead.status === 'New' ? 'text-amber-500' : ''}
                              ${lead.status === 'Contacted' ? 'text-blue-500' : ''}
                              ${lead.status === 'Paid' ? 'text-emerald-500' : ''}
                              ${lead.status === 'Lost' ? 'text-red-500' : ''}
                            `}
                          >
                            {columns.map(col => <option key={col} value={col}>{col}</option>)}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteLead(lead.id)} className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">
                          No leads in the system yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

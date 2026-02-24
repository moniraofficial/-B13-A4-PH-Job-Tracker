let jobs = [
    { id: 1, 
        company: "Mobile First Crop", 
        position: "React Native Developer", 
        location: "Remote", 
        type: "Full-time", 
        salary: "$80,000 - $110,000", 
        description: "Develop high-performance mobile application using React Native for iOS and Android platforms.", status: "all" },
    { id: 2, 
        company: "WebFlow Agency", 
        position: "Web Designer & Developer", 
        location: "San Francisco, CA", 
        type: "Part-time", 
        salary: "$50,000 - $60,000", 
        description: "Creating visually stunning and highly functional websites for a variety of clients using modern web design tools.", 
        status: "all" },
    { id: 3, 
        company: "DataViz Solutions", 
        position: "Data Visualization Specialist", 
        location: "New York, NY", 
        type: "Full-time", 
        salary: "$95,000 - $125,000", 
        description: "Transform complex data sets into compelling visual stories using D3.js, Tableau, and custom web tools.", 
        status: "all" },
    { id: 4, 
        company: "CloudFirst Inc", 
        position: "Backend Developer", 
        location: "Seattle, WA", 
        type: "Full-time", 
        salary: "$110,000 - $140,000", 
        description: "Design and maintain scalable server-side systems using Node.js and Python. Experience with AWS infrastructure is required.", 
        status: "all" },
    { id: 5, 
        company: "Innovation Labs", 
        position: "UI/UX Designer", 
        location: "Austin, TX", 
        type: "Full-time", 
        salary: "$75,000 - $90,000", 
        description: "Create beautiful and intuitive user interfaces for our suite of products. Strong background in user-centered design is expected.", 
        status: "all" },
    { id: 6, 
        company: "MegaCorp Solutions", 
        position: "JavaScript Developer", 
        location: "Chicago, IL", 
        type: "Full-time", 
        salary: "$100,000 - $120,000", 
        description: "Build enterprise applications with JavaScript and reactive frameworks. We offer competitive compensation and professional development.", 
        status: "all" },
    { id: 7, 
        company: "StartupXYZ", 
        position: "Full Stack Engineer", 
        location: "Remote", 
        type: "Full-time", 
        salary: "$90,000 - $115,000", 
        description: "Join our fast-growing startup and work on our core platform. Experience with React and PostgreSQL is highly valued.", 
        status: "all" },
    { id: 8, 
        company: "TechHub Industries", 
        position: "Senior Frontend Developer", 
        location: "San Jose, CA", 
        type: "Full-time", 
        salary: "$130,000 - $155,000", 
        description: "Lead our frontend team to build scalable web applications using React and TypeScript. Focus on performance and accessibility.", 
        status: "all" }
];

let currentTab = 'all';

function renderJobs() {
    const container = document.getElementById('job-container');
    
    // Filter jobs for current view
    const filteredJobs = currentTab === 'all' 
        ? jobs 
        : jobs.filter(j => j.status === currentTab);
    
    // Update Dashboard Numbers
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
    
    // Update Section Title Count
    document.getElementById('tab-count').innerText = `${filteredJobs.length} Jobs`;

    // Handle Empty State
    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                <div class="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <svg class="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414L13.586 3H9z" /><path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>
                </div>
                <h3 class="text-2xl font-bold text-slate-800 mb-1">No jobs available</h3>
                <p class="text-slate-400">Check back soon for new job opportunities</p>
            </div>`;
        return;
    }

    // Map through jobs to create HTML
    container.innerHTML = filteredJobs.map(job => {
        // Dynamic Badge Logic
        let badgeText = "NOT APPLIED";
        let badgeClass = "bg-slate-100 text-slate-500";
        if (job.status === 'interview') {
            badgeText = "INTERVIEW";
            badgeClass = "bg-emerald-100 text-emerald-600";
        } else if (job.status === 'rejected') {
            badgeText = "REJECTED";
            badgeClass = "bg-rose-100 text-rose-600";
        }

        return `
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-blue-200 transition-all">
                
                <button onclick="deleteJob(${job.id})" class="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>

                <h3 class="text-xl font-bold text-slate-800">${job.company}</h3>
                <p class="text-blue-600 font-bold text-sm mb-3">${job.position}</p>
                
                <div class="flex items-center gap-3 text-slate-400 text-sm mb-4 font-medium">
                    <span>${job.location || job.Location}</span> • <span>${job.type}</span> • <span class="text-slate-700">${job.salary}</span>
                </div>

                <div class="mb-5">
                    <span class="px-3 py-1 rounded text-[10px] font-black tracking-[0.1em] ${badgeClass}">
                        ${badgeText}
                    </span>
                </div>

                <p class="text-slate-500 text-sm leading-relaxed mb-8">${job.description}</p>

                <div class="flex gap-4">
                    <button onclick="updateStatus(${job.id}, 'interview')" 
                        class="px-6 py-2 border-2 border-emerald-500 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-all active:scale-95 ${job.status === 'interview' ? 'bg-emerald-500 text-white' : ''}">
                        Interview
                    </button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" 
                        class="px-6 py-2 border-2 border-rose-500 text-rose-600 font-bold rounded-xl hover:bg-rose-50 transition-all active:scale-95 ${job.status === 'rejected' ? 'bg-rose-500 text-white' : ''}">
                        Rejected
                    </button>
                </div>
            </div>`;
    }).join('');
}

function deleteJob(id) {
    // Filter array to remove item
    jobs = jobs.filter(job => job.id !== id);
    renderJobs();
}

function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    if (job) {
        job.status = (job.status === newStatus) ? 'all' : newStatus;
        renderJobs();
    }
}

function switchTab(tab) {
    currentTab = tab;
    const allTabs = ['all', 'interview', 'rejected'];
    
    allTabs.forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (btn) {
            if (t === tab) {
                btn.className = "px-6 py-2 rounded-lg font-bold bg-blue-600 text-white shadow-md transition-all";
            } else {
                btn.className = "px-6 py-2 rounded-lg font-bold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all";
            }
        }
    });

    renderJobs();
}

// Initial Run
renderJobs();

function renderJobs() {
    const container = document.getElementById('job-container');
    
       const filteredJobs = currentTab === 'all' 
        ? jobs 
        : jobs.filter(j => j.status === currentTab);
    
    // Update Dashboard Counts
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
    
    // Update the small count on the right side of the section title
    document.getElementById('tab-count').innerText = `${filteredJobs.length} Jobs`;

    // 1. Check if the list is empty
    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <div class="bg-blue-50 p-4 rounded-full mb-4">
                    <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-slate-800">No jobs available</h3>
                <p class="text-slate-500">Check back soon for new job opportunities</p>
            </div>`;
        return;
    }

    // 2. Render Cards if jobs exist
container.innerHTML = filteredJobs.map(job => {

    let badgeText = "NOT APPLIED";
    let badgeClass = "bg-slate-100 text-slate-500"; 

    if (job.status === 'interview') {
        badgeText = "INTERVIEW";
        badgeClass = "bg-emerald-100 text-emerald-600";
    } else if (job.status === 'rejected') {
        badgeText = "REJECTED";
        badgeClass = "bg-rose-100 text-rose-600";
    }

    return `
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative mb-4">
            <button onclick="deleteJob(${job.id})" class="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

            <h3 class="text-xl font-bold text-slate-800">${job.company}</h3>
            <p class="text-blue-600 font-semibold text-sm mb-2">${job.position}</p>
            
            <div class="flex items-center gap-3 text-slate-400 text-sm mb-3">
                <span>${job.location}</span> • <span>${job.type}</span> • <span class="text-slate-600 font-medium">${job.salary}</span>
            </div>

            <div class="mb-4">
                <span class="px-3 py-1 rounded text-[10px] font-bold tracking-wider ${badgeClass}">
                    ${badgeText}
                </span>
            </div>

            <p class="text-slate-500 text-sm leading-relaxed mb-6">${job.description}</p>

            <div class="flex gap-3">
                <button onclick="updateStatus(${job.id}, 'interview')" 
                    class="px-4 py-1.5 border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all font-medium ${job.status === 'interview' ? 'bg-emerald-500 text-white' : ''}">
                    Interview
                </button>
                <button onclick="updateStatus(${job.id}, 'rejected')" 
                    class="px-4 py-1.5 border border-rose-500 text-rose-600 rounded-lg hover:bg-rose-50 transition-all font-medium ${job.status === 'rejected' ? 'bg-rose-500 text-white' : ''}">
                    Rejected
                </button>
            </div>
        </div>
    `;
}).join('');
}
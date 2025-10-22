import React, { useState } from "react";

const TABS = ["Published", "Drafts", "Trashed"];

function AllPostsPage() {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">All Posts</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add New
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab === tab
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content for the active tab will go here */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Showing: {activeTab}
                </h2>
                <p>
                    Data table for {activeTab.toLowerCase()} posts will be
                    displayed here.
                </p>
            </div>
        </div>
    );
}

export default AllPostsPage;

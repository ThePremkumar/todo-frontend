import React from 'react';

export const TaskFilter = ({ filterOptions, setFilterOptions }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
      <h3 className="h6 fw-medium text-secondary mb-3">Filter &amp; Sort</h3>
      <div className="row g-3">

        {/* Status */}
        <div className="col-12 col-md-3">
          <label className="form-label text-muted mb-1" htmlFor="filter-status">
            Status
          </label>
          <select
            id="filter-status"
            name="status"
            value={filterOptions.status}
            onChange={handleFilterChange}
            className="form-select form-select-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div className="col-12 col-md-3">
          <label className="form-label text-muted mb-1" htmlFor="filter-priority">
            Priority
          </label>
          <select
            id="filter-priority"
            name="priority"
            value={filterOptions.priority}
            onChange={handleFilterChange}
            className="form-select form-select-sm"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="col-12 col-md-3">
          <label className="form-label text-muted mb-1" htmlFor="filter-sortBy">
            Sort By
          </label>
          <select
            id="filter-sortBy"
            name="sortBy"
            value={filterOptions.sortBy}
            onChange={handleFilterChange}
            className="form-select form-select-sm"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Created Date</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="col-12 col-md-3">
          <label className="form-label text-muted mb-1" htmlFor="filter-sortOrder">
            Order
          </label>
          <select
            id="filter-sortOrder"
            name="sortOrder"
            value={filterOptions.sortOrder}
            onChange={handleFilterChange}
            className="form-select form-select-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

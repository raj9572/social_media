
import "./Skeleton.scss"
export default function Skeleton() {
  return (
    <div className="post-skeleton-container">
      {/* User Header Section */}
      <div className="user-header-skeleton">
        <div className="skeleton-element profile-picture-skeleton"></div>
        <div className="username-and-timestamp-skeleton">
          <div className="skeleton-element username-skeleton"></div>
          <div className="skeleton-element timestamp-skeleton"></div>
        </div>
      </div>

      {/* Post Image Placeholder */}
      <div className="skeleton-element post-image-skeleton"></div>

      {/* Post Details and Actions Section */}
      <div className="post-details-skeleton">
        <div className="action-bar-skeleton">
          <div className="action-icon-group">
            <div className="skeleton-element action-icon-skeleton"></div>
            <div className="skeleton-element action-icon-skeleton"></div>
            <div className="skeleton-element action-icon-skeleton"></div>
          </div>
          <div className="skeleton-element bookmark-icon-skeleton"></div>
        </div>
        
        {/* Caption Text Lines */}
        <div className="skeleton-element caption-line-skeleton" style={{ width: '90%' }}></div>
        <div className="skeleton-element caption-line-skeleton" style={{ width: '70%' }}></div>
        <div className="skeleton-element caption-line-skeleton" style={{ width: '40%' }}></div>
      </div>
    </div>
  );
}
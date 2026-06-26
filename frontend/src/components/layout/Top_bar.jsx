function Top_bar() {
  return (
    <div className="top_bar">
      <div className="top_barWrapper">
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        <div className="topRight">
          <div className="top_barIconContainer">
            <i className="fas fa-bell"></i>
            <span className="topIconBadge">2</span>
          </div>
          <div className="top_barIconContainer">
            <i className="fas fa-envelope"></i>
            <span className="topIconBadge">3</span>
          </div>
          <div className="top_barIconContainer">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top_bar;
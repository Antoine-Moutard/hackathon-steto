function NavBarLaterale() {
    return (
      <div className="w-24 bg-amber-100">
        <img src="" alt="Logo de Stêto" />
        <button
          type="button"
          className="text-lg font-bold bg-amber-200 rounded-l-2xl p-2"
        >
          <i className="bi bi-people text-2xl"></i>
          Patients
        </button>
  
        <button
          type="button"
          className="text-lg font-bold bg-amber-200 rounded-l-2xl p-2 hover:bg-red-400 hover:text-white absolute bottom-0 left-0 w-24"
          onClick={() => window.location.reload()}
        >
          <i className="bi bi-box-arrow-left text-2xl"></i>
          Quitter
        </button>
      </div>
    );
  }
  
  export default NavBarLaterale;
const auth = {
    onCheckOut: () => {
      const adminId = localStorage.getItem("adminId");
      return !!adminId; // Convert to boolean
    },
  };
  
  export default auth;
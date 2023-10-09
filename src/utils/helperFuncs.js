export   const getRandomAvatarColor = (id) => {
    const colors = [
      "#f04900",
      "#d21b8b",
      "#a10000",
      "#0053a5",
      "green",
      "#407806",
      "purple",
      "darkblue",
      "green",
      "darkgreen",
    ];
    let firstNumber = 0;
    const sp = id.split("-")[0];
    for (let i = 0; i <sp.length; i++) {
      if (isNumber(sp[i])) {
        firstNumber = sp[i];
        break;
      }
    }
    return colors[firstNumber];
  };

  export const getNameIntials = (name) => {
    try {
      const nameArr = name?.split(" ");
      return `${nameArr[0][0]}${nameArr[nameArr.length - 1][0] || ''}`;
    } catch (e) {
      console.error("Error in name Intial", e);
      return "U";
    }
  };

  export const getLocalUserName = (peer) => {
    const { name, isLocal } = peer;
    return isLocal ? `${name} (You)` : name;
  }

  export const isNumber = (num) =>!isNaN(parseInt(num));

export const setLocalStorageWithUserDetails = (userDetails = {}) => {
  const { token, email, role, name } = userDetails;
  localStorage.setItem('authToken', token);
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('role', role);

}
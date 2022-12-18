export   const getRandomAvatarColor = () => {
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
    return colors[Math.round(Math.random() * 10)];
  };

  export const getNameIntials = (name) => {
    try {
      const nameArr = name?.split(" ");
      return `${nameArr[0][0]}${nameArr[nameArr.length - 1][0]}`;
    } catch (e) {
      console.error("Error in name Intial", e);
      return "U";
    }
  };
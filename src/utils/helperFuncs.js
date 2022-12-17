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

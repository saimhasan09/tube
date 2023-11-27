async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`ERROR!!! ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error( error);
    return null;
  }
}

// video show time 

function showTime(seconds) {
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ${remainingMinutes} ${
      remainingMinutes === 1 ? "minute" : "minutes"
    } ago`;
  }
}

// sorting functions

function sortViews(data, options) {
  const sortedData = data.sort((x, y) => {
    const xViews = parseInt(x.others.views);
    const yViews = parseInt(y.others.views);
    if (options) {
      console.log(options);
      return yViews - xViews;
    } else {
      console.log(options);
      return xViews - yViews;
    }
  });
  return sortedData;
}

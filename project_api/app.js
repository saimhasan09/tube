let videos = [];
let categories = [];
let isAscending = false;

// fetch data
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


// function for load data
const loadData = async (id) => {
  
  const emptyContainer = document.getElementById("empty");
  emptyContainer.innerHTML = "";
  const data = await fetchData(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  videos = data.data;
  if (videos.length > 0) {
    document.getElementById("sort").classList.remove("hide");
    showVideos(videos);
  } else {
    document.getElementById("sort").classList.add("hide");
    showEmpty();
  }
};




const loadCategories = async (id) => {
  activeId = id;
  if (categories.length == 0) {
    const data = await fetchData(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    categories = data.data;
  }
  const categoryContainer = document.getElementById("categories");
  categoryContainer.innerHTML = "";
  console.log(id);
  categories?.forEach((category) => {
    console.log(category);
    const div = document.createElement("div");


    div.innerHTML = `
    <li  
    id = ${category.category_id}
    onclick="loadCategories(${category.category_id})"
    class="divide-y divide-dashed text-xs sm:text-base ${
      id == category.category_id
        ? "bg-red-400 text-white cursor-pointer"
        : "bg-slate-300 text-white cursor-pointer"
    } rounded-md">
              <span class="sm:px-4 px-2.5 py-2 ">${category.category}</span>
            </li>`;
    categoryContainer.appendChild(div);
  });
  loadData(id);
};




const showEmpty = () => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  const emptyContainer = document.getElementById("empty");
  const div = document.createElement("div");
  div.innerHTML = `  <div class="flex flex-col mt-20 items-center justify-center">
  <img src="./svgs/empty.svg" class="h-[140px] w-[140px]" alt="Empty image here">
  <h2
    class="mt-8 text-3xl text-center font-bold md:w-[400px] w-[80%] mx-auto"
  >
    SORRY!! No Content available!!
  </h2>
</div>`;
  emptyContainer.appendChild(div);
};

// video sorting function

const sortVideos = () => {
    isAscending = true;
    if (isAscending==false) {
        document
        .getElementById("sort-container")
        
    } else {
        document
        .getElementById("sort-container")
        
    }
    const sortedVideo = sortViews(videos, isAscending);
    showVideos(sortedVideo);
};


// main video showing se

const showVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  videos?.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = ` <div
    class="h-fit rounded-lg"
  >
  <figure class="w-full min-h-[100px] h-full   sm:h-[200px] relative">
  <img
    src="${video.thumbnail}"
    class="h-full w-full rounded-md"
    alt="thumbnail picture"
  />
  <div
    class="absolute bottom-3 right-3 text-white text-xs bg-black-100 p-0.5 rounded-md"
  >
  <span> ${
    video?.others?.posted_date && showTime(video?.others?.posted_date)
  }</span>
  </div>
</figure>
    <div class="flex gap-3 mt-5">
      <div class="w-fit mt-0.5">
        <div class="person">
          <div class="w-8 rounded-full ">
            <img  src=${video?.authors[0].profile_picture} />
          </div>
        </div>
      </div>
      <div class="flex-1">
        <h3
          class="text-gray-900 max-w-prose line-clamp-2 font-bold text-base "
        >
        ${video.title}
        </h3>
        <div class="flex gap-2  mt-2 mb-2 items-center">
          <p class="text-sm text-gray-700">${video?.authors[0].profile_name}</p>
         ${
           video?.authors[0].verified
             ? '<i class="fa-solid fa-certificate"></i>'
             : ""
         }
        </div>
        <p class="text-sm mt-2 text-gray-500">${video?.others?.views} views</p>
      </div>
    </div>
  </div>`;
    videoContainer.appendChild(div);
  });
};


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
      // console.log(options);
      return yViews - xViews;
    } else {
      // console.log(options);
      return xViews - yViews;
    }
  });
  return sortedData;
}


loadCategories("1000");

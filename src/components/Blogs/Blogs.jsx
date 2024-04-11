import React from "react";
import Heading from "../Shared/Heading";

// import images
import Img1 from "../../assets/blogs/news1.jpg";
import Img2 from "../../assets/blogs/news2.png";
import Img3 from "../../assets/blogs/news3.png";

const BlogData = [
  {
    title: "10 writers win 2024 Whiting Awards for emerging authors",
    subtitle:
      "Ten emerging writers have won the 2024 Whiting Awards, announced in a ceremony Wednesday night. Each writer will receive $50,000 to help support their craft — one of largest awards granted to new authors.",
    published: "APRIL 10, 2024 By Meghan Collins Sullivan",
    image: Img1,
    aosDelay: "0",
  },
  {
    title: "'Magical Overthinking' author says information overload can stoke irrational thoughts",
    subtitle:
      "How is it that we are living in the information age — and yet life seems to make less sense than ever? That's the question author and podcast host Amanda Montell set out to answer in her new book, The Age of Magical Overthinking.",
    published: "APRIL 9, 2024 by  FRESH AIR",
    image: Img2,
    aosDelay: "200",
  },
  {
    title: "International Booker Prize shortlist for 2024 spans three continentst",
    subtitle:
      "Six languages. Six countries. Three continents. The novels on this year's International Booker Prize shortlist span cultures, styles and the breadth of human experience.'Novels carry us to places where we might never set foot and connect us with new sensations and memories,' said Eleanor Wachtel,",
    published: "APRIL 9, 2024 by Elizabeth Blair",
    image: Img3,
    aosDelay: "400",
  },
];
const Blogs = () => {
  return (
    <div className="my-12">
      <div className="container">
        {/* Header section */}
        <Heading title="Recent News" subtitle={"Explore Our Blogs"} />

        {/* Blog section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
          {/* Blog card */}
          {BlogData.map((data) => (
            <div
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              key={data.title}
              className="bg-white dark:bg-gray-900"
            >
              {/* image section */}
              <div className="overflow-hidden rounded-2xl mb-2">
                <img
                  src={data.image}
                  alt=""
                  className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
                />
              </div>
              {/* content section */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500">{data.published}</p>
                <p className="font-bold line-clamp-1">{data.title}</p>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {data.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

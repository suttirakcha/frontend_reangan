import homeHeroImg from "@/assets/home-hero-img.svg";
import freeAccessImg from "@/assets/free-access-img.svg";
import readyBannerImg from "@/assets/ready-banner-img.svg";
import noAdsImg from "@/assets/no-ads-img.svg";
import learnAnywhereImg from "@/assets/learn-anywhere-img.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HomeSection from "@/components/custom/HomeSection";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCourseStore from "@/stores/useCourseStore";
import { useEffect } from "react";

function HomePage() {
  const courses = useCourseStore((state) => state.courses);
  const getCourses = useCourseStore(state => state.getCourses);

  useEffect(() => {
    getCourses();
  }, [])

  return (
    <main className="max-lg:text-center">
      <section className="flex items-center gap-12 h-[80vh] max-h-[600px] relative">
        <img
          src={homeHeroImg}
          className="absolute top-0 left-0 -z-1 w-full h-full opacity-40 object-cover"
        />
        <div className="items-center p-12 justify-between max-w-[1300px] w-full mx-auto">
          <div className="flex flex-col gap-48 lg:gap-12">
            <h1 className="title-xl">
              Let's have fun from <br />
              learning a language
            </h1>
            <Link to="/register">
              <Button className="main-btn w-[320px]">Get started</Button>
            </Link>
          </div>
        </div>
      </section>
      <HomeSection
        className="py-20"
        imgSrc={freeAccessImg}
        imgSide="left"
        imgClassName="w-[400px] h-[400px] rounded-full"
        title="Completely Free Access"
        description="All courses are 100% free, so you can explore and learn without worrying about subscription fees or hidden costs."
      />
      <HomeSection
        className="py-20"
        imgSrc={noAdsImg}
        imgSide="right"
        imgClassName="w-[400px] h-[400px] rounded-full"
        title="Ad-Free Experience"
        description="Enjoy uninterrupted learning with no annoying ads — focus entirely on mastering your new language."
      />
      <HomeSection
        imgSrc={learnAnywhereImg}
        imgSide="left"
        imgClassName="w-[600px] h-[600px] object-cover"
        title="Learn Anytime, Anywhere"
        description="Learn at your own pace, on any device, wherever you are. Perfect for busy schedules and on-the-go lifestyles."
      />
      <section className="py-20 bg-orange-200">
        <div className="flex flex-col gap-8 px-12 text-center max-w-[1300px] mx-auto w-full">
          <h1 className="title-xl">Explore our language courses</h1>
          <div className="grid lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl flex justify-between">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-500 text-left">
                    {course.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )).slice(0, 3)}
          </div>
        </div>
      </section>
      <section className="flex items-center gap-12 h-[80vh] max-h-[600px] relative">
        <img
          src={readyBannerImg}
          className="absolute top-0 left-0 -z-1 w-full h-full opacity-40 object-cover"
        />
        <div className="items-center p-12 text-center max-w-[1300px] w-full mx-auto">
          <div className="flex flex-col gap-30">
            <h1 className="title-xl">Ready to learn languages?</h1>
            <Link to="/register">
              <Button className="main-btn w-[320px]">Get started</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

import homeHeroImg from "@/assets/home-hero-img.svg";
import freeAccessImg from "@/assets/free-access-img.svg";
import noAdsImg from "@/assets/no-ads-img.svg";
import learnAnywhereImg from "@/assets/learn-anywhere-img.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HomeSection from "@/components/custom/HomeSection";

function HomePage() {
  return (
    <main className="max-lg:text-center">
      <section className="flex items-center gap-12 h-[80vh] max-h-[600px] relative">
        <img
          src={homeHeroImg}
          className="absolute top-0 left-0 -z-1 w-full h-full opacity-40 object-cover"
        />
        <div className="grid lg:grid-cols-2 items-center p-12 justify-between max-w-[1300px] w-full mx-auto">
          <div className="flex flex-col gap-12">
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
        className="p5-20"
        imgSrc={learnAnywhereImg}
        imgSide="left"
        imgClassName="w-[600px] h-[600px]"
        title="Learn Anytime, Anywhere"
        description="Learn at your own pace, on any device, wherever you are. Perfect for busy schedules and on-the-go lifestyles."
      />
      <section className="py-20 bg-orange-200">
        <div className="flex flex-col gap-8 text-center">
          <h1 className="title-xl">Learn Anytime, Anywhere</h1>
          <p>
            Learn at your own pace, on any device, wherever you are. Perfect for
            busy schedules and on-the-go lifestyles.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

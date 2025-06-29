import { LearnIcon } from "@/components/icons/LearnIcon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="max-lg:text-center">
      <section className="items-center gap-12 py-20">
        <div className="grid lg:grid-cols-2 items-center p-8 gap-10 max-w-[1000px] mx-auto">
          <div className="flex max-lg:justify-center">
            <LearnIcon className="w-2/5" />
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="title">Let's have fun from learning a language</h1>
            <Link to="/register">
              <Button className="main-btn">Get started</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-orange-200 py-20">
        <div className="grid lg:grid-cols-2 items-center p-8 mx-auto max-w-[1000px]">
          <div className="flex flex-col gap-8">
            <h1 className="title">Learn from anywhere</h1>
            <p>
              Whenever you live at home, office, or at school, you will freely
              learn anything from this app
            </p>
            <button>Get started</button>
          </div>
          <div className="">Mascot</div>
        </div>
      </section>
      <section className="bg-orange-200 py-20">
        <div className="grid lg:grid-cols-2 items-center p-8 mx-auto max-w-[1000px]">
          <div className="flex flex-col gap-8">
            <h1 className="title">Learn from anywhere</h1>
            <p>
              Whenever you live at home, office, or at school, you will freely
              learn anything from this app
            </p>
            <button>Get started</button>
          </div>
          <div className="">Mascot</div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

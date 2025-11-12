import AnimateLayout from "../AnimateLayout";

const Home = () => {
  return (
    <AnimateLayout title="ABOUT ME">
      <p className="font-Poppins_Medium text-[clamp(12px,3vw,15px)]">
        I’m a front-end developer and I’ve been diving into the world of front-end since 2023. I love designing websites and tackling new challenges, and I always make sure my sites are fast and optimized. Time management is super important to me. I’ve got a few certificates from{" "}
        <a className="font-Poppins_Medium text-orange" target="_blank" href="https://mftplus.com">
          Tehran Technical Complex
        </a>
        , and I’m always on the lookout for learning new technologies.
      </p>
    </AnimateLayout>
  );
};

export default Home;

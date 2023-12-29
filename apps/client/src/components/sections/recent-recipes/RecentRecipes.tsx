import { Home } from '@types';
import RecentCardBig from '@components/elements/recent-card-big/RecentCardBig';
import RecentCardSmall from '@components/elements/recent-card-small/RecentCardSmall';

interface RecentProps {
  recents?: Home['recents'];
}

const RecentRecipes: React.FC<RecentProps> = ({ recents }) => {
  const recentBig = recents?.slice(0, 2);
  const recentSmall = recents?.slice(2, 9);

  return (
    <>
      <h2 className="color-gray-300 d-inline-block mb-10 wow animate__animated animate__fadeInUp">
        Newest Recipes
      </h2>
      <p className="text-lg color-gray-300 wow animate__animated animate__fadeInUp">
        Our most recently added recipes
      </p>
      <div className="row mt-90 mb-50">
        <div className="col-lg-12">
          <div className="box-list-posts">
            <div className="row">
              <div className="col-lg-7">
                {recentBig?.map((recipe, i) => (
                  <RecentCardBig recipe={recipe} key={recipe.uid} />
                ))}
              </div>
              <div className="col-lg-5">
                <div className="row">
                  {recentSmall?.map((recipe, i) => (
                    <div className="col-lg-12" key={i}>
                      <RecentCardSmall recipe={recipe} key={recipe.uid} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentRecipes;

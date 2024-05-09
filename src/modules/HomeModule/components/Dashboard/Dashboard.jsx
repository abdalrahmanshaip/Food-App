import Header from "../../../SharedModule/components/Header/Header";
import homeavatar from "../../../../assets/media/home-avatar.svg";
import RecipesFill from "../../../RecipesModule/compeonets/RecipesFill/RecipesFill";

export default function Dashboard() {
  return (
    <>
      <Header
        title={"Welcome"}
        sectitle={"Upskilling!"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgurl={homeavatar}
      />
      <RecipesFill />
    </>
  );
}

import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import MealsFilter from "../../components/MealsFilter/MealsFilter";
import MealsList from "../../components/MealsList/MealsList";

// styles
import "./Planner.css";

export default function Planner() {
  const { user } = useAuthContext();
  const { documents, error, isPending } = useCollection("meals", user.uid);
  const [currentFilter, setcurrentFilter] = useState("all");
  const [plannedDocuments, setPlannedDocuments] = useState([]);

  const isInPlanner = true;

  const sortedByFilterMeals = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "breakfast":
          case "lunch":
          case "dinner":
          case "snack":
          case "other":
            return document.category === currentFilter;
          case "favourites":
            return document.isFav;
          default:
            return true;
        }
      })
    : null;

  const changeFilter = (newFilter) => {
    setcurrentFilter(newFilter);
  };

  useEffect(() => {
    if (documents) {
      const planned = documents.filter((doc) => {
        return doc.isPlanned ? true : false;
      });
      setPlannedDocuments(planned);
    }
  }, [documents]);

  if (documents) {
    return (
      <div className="planner-wrapper">
        {plannedDocuments.length !== 0 && (
          <MealsFilter changeFilter={changeFilter} />
        )}
        <div className="planner-container">
          <MealsList
            documents={sortedByFilterMeals}
            isInPlanner={isInPlanner}
          />
        </div>
        {plannedDocuments.length === 0 && (
          <div className="planner-info">
            <h3 className="planner-info-header">No meals planned yet...</h3>
            <p className="planner-info-text">
              Go to your <span className="lint-text">Meals Book </span>and
              create some awesome recipes.
              <br />
              <br />
              And remember, add them to the{" "}
              <span className="lint-text">Planner!</span>
            </p>
            <Link to="/meals" className="toMeals-btn">
              Meals book
            </Link>
          </div>
        )}
        <ScrollToTop className="scroll-to-top" />
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
}

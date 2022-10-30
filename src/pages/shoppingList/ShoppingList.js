import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// styles and icons
import "./ShoppingList.css";
import { ImCheckboxChecked } from "react-icons/im";

export default function ShoppingList() {
  const { user } = useAuthContext();
  const { documents, error, isPending } = useCollection("meals", user.uid);

  const [items, setItems] = useState([]);

  // fetch and format shopping list
  useEffect(() => {
    if (documents) {
      let result = [];
      documents.map((doc) => {
        if (doc.isPlanned) {
          return result.push(...doc.ingredients);
        }
      });
      const filteredResult = [...new Set(result)];
      setItems(filteredResult);
    }
  }, [documents, user.uid]);

  const handleClick = (i) => {
    const div = document.getElementById(`${i}-item`);

    if (div.classList.contains("not-complete")) {
      div.classList.replace("not-complete", "completed");
    } else {
      div.classList.replace("completed", "not-complete");
    }
  };

  if (items) {
    return (
      <div>
        {items.length !== 0 && (
          <div className="shopping-list-wrapper">
            <div className="shopping-list-content">
              <h2 className="shopping-list-header">Todays shopping! </h2>

              <ul>
                {items.map((item, i) => (
                  <div className="list-item-container" key={item}>
                    <li>{item}</li>
                    <div
                      className="not-complete"
                      onClick={() => handleClick(i)}
                      id={`${i}-item`}
                    >
                      <ImCheckboxChecked />
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        )}
        {items.length === 0 && (
          <div className="shopping-list-info">
            <h4 className="shopping-list-info-header">
              No items in shopping list yet...
            </h4>

            <p className="shopping-list-info-text">
              Looks like you didnt plan your meals yet.
              <br></br>
              Visit your <span className="lint-text">Meals Book</span> and add
              recipes to the <span className="lint-text">Planner.</span>
              Your shopping list will appear here.
            </p>

            <Link to="/meals" className="toMeals-btn">
              Meals Book
            </Link>
          </div>
        )}
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
    return (
      <div>
        <div className="error">{error}</div>
      </div>
    );
  }
}

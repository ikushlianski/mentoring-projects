import dayjs from "dayjs";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import {
  DeleteFunction,
  EatFunction,
  EditFunction,
  UIMeal,
} from "src/components/types";
import classes from "src/components/meal.module.css";

interface Props {
  mealData: UIMeal;
  handleEat: EatFunction;
  handleEdit: EditFunction;
  handleDelete: DeleteFunction;
}

export const Meal: React.FC<Props> = ({
  mealData,
  handleEat,
  handleEdit: handleSaveNewTime,
  handleDelete,
}) => {
  const [newTime, setNewTime] = useState<Date | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const index = Number(mealData.key) + 1;

  const handleLocalEdit = () => {
    setIsEditing(true);
  };

  const onSetNewTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = event.target.value?.split(":");

    if (hours && minutes) {
      const newTime = new Date();

      // on a real project, we should also check whether the newly set time is a new day, thus we may need to increment a day number
      newTime.setHours(Number(hours));
      newTime.setMinutes(Number(minutes));

      setNewTime(newTime);
    }
  };

  return (
    <>
      <div className={classes.meal}>
        <span>{index}</span>

        <div>{dayjs(mealData.time).format("HH:mm")}</div>

        <ButtonGroup aria-label="Basic example">
          {mealData.eaten ? (
            <Button disabled={true} variant={"success"}>
              Eaten
            </Button>
          ) : (
            <Button
              variant="primary"
              disabled={mealData.isEatButtonDisabled}
              onClick={handleEat(mealData)}
            >
              Eat
            </Button>
          )}

          {
            <Button variant="outline-secondary" onClick={handleLocalEdit}>
              Edit
            </Button>
          }
          {mealData.isLastMeal && (
            <Button variant="outline-danger" onClick={handleDelete(mealData)}>
              Delete
            </Button>
          )}
        </ButtonGroup>
      </div>

      {isEditing && (
        <div>
          <Modal.Dialog centered>
            <Modal.Body>
              <p>Set new time for your meal</p>
              <input
                type="time"
                onChange={onSetNewTime}
                defaultValue={mealData.time.toLocaleDateString()}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleSaveNewTime(mealData, newTime);
                  setIsEditing(false);
                }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
};

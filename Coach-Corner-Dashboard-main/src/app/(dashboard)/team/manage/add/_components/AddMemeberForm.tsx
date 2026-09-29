
import Link from "next/link";
import React from "react";

const AddMemeberForm = () => {
  return (
    <div className="max-w-3xl mx-auto bg-blur">
      <div className="form-wrapper">
        <div className="field">
          <label htmlFor="Select Team Role" className="input--label">
            Select Team Role
          </label>
          <select
            name="Select Team Role"
            id="Select Team Role"
            className="input--field select--field"
          >
            <option value="Forword">Forword</option>
            <option value="Goalkeeper">Goal Keeper</option>
            <option value="MidField">MidField</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="email" className="input--label">
            Enter Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            autoCapitalize="false"
            autoCorrect="false"
            required
            className="input--field"
          />
        </div>
        <div className="field">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href={'/team/manage'} className="btn btn--secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn--primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemeberForm;

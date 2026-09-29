import { TableCell, TableRow } from "@/components/ui/table";
import { AddMemberItem } from "@/helpers/types";
import { footballTeamRoles } from "@/lib/teamRoles";
import React, { useState } from "react";

type props = {
  player: AddMemberItem;
  active: boolean;
  onAdd: (obj: AddMemberItem) => void;
  selected: AddMemberItem | null | undefined;
};
const PlayerItem = ({ player, active, onAdd, selected }: props) => {
  const [role, setRole] = useState(selected ? selected?.teamRole : "");
  const [error, setError] = useState<any>(null);
  const handleAdd = () => {
    if (!role) {
      setError("Please select a role");
      return;
    }
    setError(null);
    onAdd({
      ...player,
      teamRole: role,
    });
  };
  return (
    <TableRow>
      <TableCell>{player?.fName}</TableCell>
      <TableCell>{player?.lName}</TableCell>
      <TableCell>{player?.email}</TableCell>
      <TableCell className="text-nowrap min-w-40">
        <div className="field basis-full md:basis-1/3 m-0 w-full">
          <select
            required
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            id="role"
            className="input--field select--field"
          >
            <option value="" disabled>
              Select role
            </option>
            {footballTeamRoles?.map((role) => (
              <option key={role?.value} value={role?.value}>
                {role?.label}
              </option>
            ))}
          </select>
          {error && <p className="py-1 text-red-400 text-sm">{error}</p>}
        </div>
      </TableCell>
      <TableCell>
        <button
          className="btn btn--primary"
          type="button"
          onClick={() => handleAdd()}
          disabled={active}
        >
          {active ? "Added" : "Add"}
        </button>
      </TableCell>
    </TableRow>
  );
};

export default PlayerItem;

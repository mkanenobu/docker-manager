import { type FC } from "react";
import type { docker } from "../../wailsjs/go/models";

const ContainerRow: FC<{ container: docker.Container }> = ({ container }) => {
  return (
    <tr>
      <td>{container.Id}</td>
      <td>{container.Names.join(",")}</td>
      <td>{container.Status}</td>
      <td>{container.Command}</td>
      <td>{container.Created}</td>
    </tr>
  );
};

export const Containers: FC<{ containers: docker.Container[] }> = ({
  containers,
}) => {
  return (
    <div id="containers">
      <h1>Containers</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Names</th>
            <th>Status</th>
            <th>Command</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {containers.map((container) => (
            <ContainerRow container={container} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

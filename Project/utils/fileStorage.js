import fs from "fs/promises";

export const setup = () => {
  fs.access("./planes.json")
    .then((data) => console.log(data))
    .catch((err) => fs.writeFile("./planes.json", "[]"));
};

export const allPlanes = () => {
  return fs
    .readFile("./planes.json", { encoding: "utf8" })
    .then((data) => JSON.parse(data));
};

export const savePlane = (plane) => {
  allPlanes()
    .then((data) => {
      data.push(plane);
      console.log(data);
      return data;
    })
    .then((array) => fs.writeFile("./planes.json", JSON.stringify(array)));
};

// - Löscht immer einfach das letzte Element....
// export const deleteLastPlane = (plane) => {
//   allPlanes()
//     .then((data) => {
//       data.find((plane) => plane.id);
//       const planeIndex = data.indexOf(plane);
//       data.splice(planeIndex, 1);
//       return data;
//     })
//     .then((array) => fs.writeFile("./planes.json", JSON.stringify(array)));
// };

export const deletePlane = (id) => {
  allPlanes().then((data) => {
    data.forEach((element, index) => {
      //* gucke in jedem Element des Data Arrays, ob die id der gesuchten id übereinstimmt
      if (element.id === id) {
        //* entferne das element aus der data am index der gesuchten id
        data.splice(index, 1);
        console.log(data);
        //* schreibe die neue data ins planes.json
        fs.writeFile("./planes.json", JSON.stringify(data));
      }
    });
  });
};

//- klappt noch nicht hundert pro so wie ich es gerne hätte, aber mein Kopf brummt :-(

export const change = (id) => {
  allPlanes().then((data) => {
    data.forEach((element, index) => {
      if (element.id === id) {
        let aenderung = { Änderung: "xy" };
        data.splice(index, 0, aenderung);
        fs.writeFile("./planes.json", JSON.stringify(data));
      }
    });
  });
};

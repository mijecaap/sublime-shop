export const getStatusColor = (status) => {
  switch (status) {
    case "pendiente":
      return "#FF9800";
    case "diseño":
      return "#FFC107";
    case "aprobado":
      return "#4CAF50";
    case "produccion":
      return "#2196F3";
    case "envio":
      return "#673AB7";
    case "entregado":
      return "#009688";
    default:
      return "#ccc";
  }
};

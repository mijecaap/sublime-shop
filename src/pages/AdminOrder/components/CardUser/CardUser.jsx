import React from "react";
import {
  Card,
  CardDetails,
  CardDetailsReference,
  CardLabel,
  GenericPhoto,
  Name,
} from "./styles";
import { reniec } from "ubigeo-peru";

const CardUser = ({ user }) => {
  const { name, email, photoURL, address } = user;

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((name) => name.charAt(0));
    return initials.join("");
  };

  const getDepartmentName = (department) => {
    const departmentName = reniec.filter((item) => {
      return (
        item.departamento === department &&
        item.provincia === "00" &&
        item.distrito === "00"
      );
    })[0].nombre;
    return departmentName;
  };

  const getDistrictName = (department, district) => {
    const districtName = reniec.filter((item) => {
      return (
        item.departamento === department &&
        item.provincia === district &&
        item.distrito === "00"
      );
    })[0].nombre;
    return districtName;
  };

  return (
    <Card>
      {photoURL ? (
        <Photo src={photoURL} alt="User Photo" />
      ) : (
        <GenericPhoto>{getInitials(name)}</GenericPhoto>
      )}
      <Name>{name}</Name>
      <CardDetails>
        <CardLabel>Correo:</CardLabel>
        <span>{email}</span>
      </CardDetails>
      {address && (
        <>
          <CardDetails>
            <CardLabel>Nombre:</CardLabel>
            <span>{address[0].fullname}</span>
          </CardDetails>
          <CardDetails>
            <CardLabel>Número:</CardLabel>
            <span>{address[0].cellphone}</span>
          </CardDetails>
          <CardDetails>
            <CardLabel>Departamento:</CardLabel>
            <span>{getDepartmentName(address[0].department)}</span>
          </CardDetails>
          <CardDetails>
            <CardLabel>Distrito:</CardLabel>
            <span>
              {getDistrictName(address[0].department, address[0].district)}
            </span>
          </CardDetails>
          <CardDetails>
            <CardLabel>{address[0].streetType}:</CardLabel>
            <span>{address[0].streetName}</span>
          </CardDetails>
          <CardDetailsReference>
            <CardLabel>Referencia:</CardLabel>
            <span>{address[0].reference}</span>
          </CardDetailsReference>
        </>
      )}
    </Card>
  );
};

export default CardUser;

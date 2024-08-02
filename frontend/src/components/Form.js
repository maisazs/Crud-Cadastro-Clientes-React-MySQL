import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import "../styles/Form.css" //importação do css

const FormContainer = styled.form``;

const InputArea = styled.div``;

const Input = styled.input``;

const Label = styled.label``;

const Button = styled.button``;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit} className="FormContainer">
      <InputArea className="InputArea">
        <Label className="Label">Nome</Label>
        <Input name="nome" className="Input"/>
      </InputArea>
      <InputArea className="InputArea">
        <Label className="Label">E-mail</Label>
        <Input name="email" type="email" className="Input"/>
      </InputArea>
      <InputArea className="InputArea">
        <Label className="Label">Telefone</Label>
        <Input name="fone" className="Input"/>
      </InputArea>
      <InputArea className="InputArea">
        <Label className="Label">Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" className="Input"/>
      </InputArea>

      <Button type="submit" className="Button">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
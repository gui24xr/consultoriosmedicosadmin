"use client";
import { useActionState, useTransition } from "react";
import { FormWrapper } from "@/components/Layout";
import { Button, Form, Input, FormProps } from "antd";
import { createSpecialty } from "@/actions";
import { antdFormConfig } from "@/configs/antdformconfigs";
import { SpecialtyCard } from "@/components/specialties";

type FieldType = {
  name: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function SpecialtyCreateForm() {
  const [isPendingTransition, startTransition] = useTransition();
  const [
    stateCreateSpecialty,
    createSpecialtyDispatch,
    isPendingCreateSpecialty,
  ] = useActionState(createSpecialty, null);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (!values) return;
    startTransition(() => createSpecialtyDispatch(values));
  };

  const FormCreateSpecialty = () => {
    return (
      <>
        <Form
          {...antdFormConfig}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType>
            label="Nombre de especialidad"
            name="name"
            rules={[
              {
                required: true,
                message:
                  "Ingrese el nombre de la especialidad. EJ: Medicina general",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={null}
            wrapperCol={{
              span: 24,
              style: { textAlign: "center", marginTop: 60 },
            }}
          >
            {" "}
            <Button type="primary" htmlType="submit" style={{ width: "80%" }}>
              Crear especialidad
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };
  return (
    <div className="h-[90dvh] p-4">
      <FormWrapper
        formTitle={"Crear especialidad"}
        formDescription={"Ingrese los datos de la especialidad."}
        mainForm={<FormCreateSpecialty />}
        formIsTasking={isPendingCreateSpecialty}
        formTaskingMessage={"Creando especialidad..."}
        taskingSuccessOK={stateCreateSpecialty?.success == true}
        taskingSuccessFail={stateCreateSpecialty?.success == false}
        renderOnSuccessOK={
          stateCreateSpecialty?.success ? (
            <SpecialtyCard specialty={stateCreateSpecialty.payload} expanded />
          ) : null
        }
        notificateOnSuccessOK={true}
        noticationSuccessOKMessage={"Especialidad creada correctamente."}
        notificateOnSuccessFail={true}
        noticationSuccessFailMessage={
          stateCreateSpecialty?.message || "Algo salio mal"
        }
      />
    </div>
  );
}

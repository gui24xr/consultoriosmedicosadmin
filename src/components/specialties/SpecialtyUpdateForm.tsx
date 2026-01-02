"use client";
import { SpecialtyDTO } from "@/types";
import { useActionState, useTransition } from "react";
import { FormWrapper } from "@/components/Layout";
import { Button, Form, Input, FormProps } from "antd";
import { updateSpecialty } from "@/actions";
import { antdFormConfig } from "@/configs/antdformconfigs";
import { SpecialtyCard } from "@/components/specialties";

type FieldType = {
  name: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function SpecialtyUpdateForm({ specialty }: { specialty: SpecialtyDTO }) {
  const [isPendingTransition, startTransition] = useTransition();
  const [
    stateUpdateSpecialty,
    dispatch,
    isPending,
  ] = useActionState(updateSpecialty, null);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (!values) return;
    const newValues = { id: specialty.id, ...values }
    startTransition(() => dispatch(newValues));
  };

  const FormEditSpecialty = () => {
    return (
      <>
        <Form
          {...antdFormConfig}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            name: specialty.name
          }}
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
              Editar especialidad
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };
  return (
    <div className="h-[90dvh] p-4">
      <FormWrapper
        formTitle={"Editar especialidad"}
        formDescription={"Ingrese los datos de la especialidad."}
        mainForm={<FormEditSpecialty />}
        formIsTasking={isPending}
        formTaskingMessage={"Actualizando especialidad..."}
        taskingSuccessOK={stateUpdateSpecialty?.success == true}
        taskingSuccessFail={stateUpdateSpecialty?.success == false}
        renderOnSuccessOK={
          stateUpdateSpecialty?.success ? (
            <SpecialtyCard specialty={stateUpdateSpecialty.payload} expanded />
          ) : null
        }
        notificateOnSuccessOK={true}
        noticationSuccessOKMessage={"Especialidad actualizada correctamente."}
        notificateOnSuccessFail={true}
        noticationSuccessFailMessage={
          stateUpdateSpecialty?.message || "Algo salio mal"
        }
      />
    </div>
  );
}

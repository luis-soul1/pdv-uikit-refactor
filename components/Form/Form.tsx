import { useRouter } from "next/router";
import { useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";

import InputField from "@Uikit/Forms/Input/InputField";
import SelectField from "@Uikit/Forms/Select/SelectField";
import PdvButton from "@Uikit/PdvButton";
import { PdvIcons } from "@Uikit/PdvIcons";
import PageTitle from "commons/PageTitle";
import {
  useCommuneQueries,
  useProvinceQueries,
  useRegionQueries,
} from "hooks/request/commonsQueries";
import { useSchoolQuery } from "hooks/request/schoolQuery";
import { useTeachingTypeQueries } from "hooks/request/teachingTypeQuery";
import useQueryParams from "hooks/useQueryParams";
import { formatRut, validateRut } from "utils/helpers";
import TextAreaField from "@Uikit/Forms/TextArea/TextAreaField";
import TimeField from "@Uikit/Forms/Timepicker/TimeField";
import dayjs, { Dayjs } from "dayjs";
import DateField from "@Uikit/Forms/Datepicker/DateField";
import RadioGroupField from "@Uikit/Forms/Radio/RadioGroupField";
import RangeDateField from "@Uikit/Forms/Datepicker/RangeDateField";
import AutocompleteField, {
  TOption,
} from "@Uikit/Forms/Autocomplete/AutocompleteField";

type FormValues = {
  name: string;
  name1: string;
  name2: string;
  name3: string;
  address: string;
  commune: string;
  province: string;
  rut: string;
  rbd: string;
  email: string;
  telephone: string;
  mobile: string;
  web: string;
  province_id: string;
  region_id: string;
  commune_id: string;
  type_establishment_id: string;
  multidemo: string[];
  time_end: Date;
  date: Date;
  dateFrom: Date;
  dateTo: Date;
  permissions: string;
  autocompelete: TOption;
};

const defaultValues = {
  name: "",
  name1: "",
  name2: "",
  name3: "",
  address: "",
  commune: "",
  province: "",
  rut: "",
  rbd: "",
  email: "",
  telephone: "",
  mobile: "",
  web: "",
  province_id: "",
  region_id: "",
  commune_id: "",
  type_establishment_id: "",
  multidemo: [],
  time_end: new Date(),
  date: new Date(),
  dateFrom: new Date(),
  dateTo: new Date(),
  permissions: "basic",
  autocompelete: { label: "", value: "" },
};

const permissionsRadioOptions = [
  {
    label: "Permisos Generales",
    value: "basic",
  },
  {
    label: (
      <h1>
        Test con Element <PdvIcons name="Work" />{" "}
      </h1>
    ),
    value: "actions",
  },
];

const GeneralForm = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const form = useForm<FormValues>({ defaultValues });

  const permissionsSelected = "basic";

  const { data: formDataQuery } = useSchoolQuery(id as string);

  const regionQueryParams = useQueryParams({ pagination: false });
  const { data: regions } = useRegionQueries({
    queryParams: regionQueryParams.queryParams,
  });

  const provinceQueryParams = useQueryParams({ pagination: false });
  const { data: provinces } = useProvinceQueries({
    queryParams: provinceQueryParams.queryParams,
    enabled: !!form.watch("region_id"),
  });

  const communeQueryParams = useQueryParams({ pagination: false });
  const { data: communes } = useCommuneQueries({
    queryParams: communeQueryParams.queryParams,
    enabled: !!form.watch("province_id"),
  });

  const { data: autocompleteOpts } = useTeachingTypeQueries();

  const filterProvinces = (value: string) => {
    form.setValue("province_id", "");
    form.setValue("commune_id", "");
    provinceQueryParams.onChangeQueryParams({ filter: { region_id: value } });
  };

  const filterCommunes = (value: string) =>
    communeQueryParams.onChangeQueryParams({ filter: { province_id: value } });

  const onSelectAutocompleteOpt = (
    value: string | { label: string; value: string } | null
  ) => {
    console.info(value);
    form.setValue("autocompelete", { label: "", value: "" });
  };

  const onSubmit = (data: FormValues) => {
    console.info(data);
  };

  useEffect(() => {
    const { web, address, email, ...requiredFields } = form.getValues();
    const formHasValues = Object.values(requiredFields).some(
      (field) => field !== "" && field !== ""
    );
    console.log({ formDataQuery, formValues: form.getValues() });
    if (id && formDataQuery) {
      form.setValue("rut", formatRut(formDataQuery.rut));
      form.setValue("rbd", formDataQuery.rbd);
      form.setValue("name", formDataQuery.name);
      form.setValue("name1", formDataQuery.name);
      form.setValue("name2", formDataQuery.name);
      form.setValue("name3", formDataQuery.name);
      form.setValue(
        "type_establishment_id",
        formDataQuery.type_establishment_id.toString()
      );
      form.setValue("web", formDataQuery.web);
      form.setValue("address", formDataQuery.address);
      form.setValue("telephone", formDataQuery.telephone);
      form.setValue("mobile", formDataQuery.mobile);
      form.setValue("email", formDataQuery.email);
      form.setValue("region_id", formDataQuery.region_id.toString());
      if (formDataQuery.region_id)
        filterProvinces(formDataQuery.region_id.toString());
      if (formDataQuery.province_id)
        filterCommunes(formDataQuery.province_id.toString());

      form.setValue("province_id", formDataQuery.province_id.toString());
      form.setValue("commune_id", formDataQuery.commune_id.toString());
    }
  }, [id, formDataQuery]);

  useEffect(() => {
    const subscription = form.watch((data) => {
      console.log({ data });
      const isAlreadyFormatted = data.rut && data.rut === formatRut(data.rut);
      if (data.rut && !isAlreadyFormatted) {
        form.setValue("rut", formatRut(data.rut));
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <form className="my-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
      <PageTitle title="Uikit Form Demo" asHeader />

      <PdvButton
        icon="Check"
        type="submit"
        theme="teal-500"
        size="small"
        className="ml-auto mt-5 block"
      >
        Submit
      </PdvButton>

      <h6 className="subtitle2 text-blue-500">INPUTS</h6>
      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2">
        <InputField
          label="Input Default"
          name="rbd"
          variant="default"
          form={form}
          icon="Search"
          iconColor="teal-500"
          inputProps={{ placeholder: "1" }}
          options={{ required: "Este campo es requerido" }}
          className="my-2"
        />

        <InputField
          label="Rut"
          name="rut"
          form={form}
          options={{
            required: "Este campo es requerido",
            validate: (value) =>
              validateRut(value) || "Debe ingresar un rut válido",
          }}
          inputProps={{ placeholder: "15.891.228-7" }}
          className="my-2 max-w-md"
        />
      </div>

      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2">
        <InputField
          label="Transparente"
          name="rbd"
          variant="transparent"
          form={form}
          inputProps={{ placeholder: "1" }}
          options={{ required: "Este campo es requerido" }}
          className="my-2 w-full"
        />
        <InputField
          label="Outlined"
          name="name"
          variant="outlined"
          form={form}
          inputProps={{ placeholder: "Nombre colegio" }}
          options={{ required: "Este campo es requerido" }}
          className="my-2 w-full"
        />

        <TextAreaField
          label="Outlined Textarea"
          name="name1"
          variant="outlined"
          form={form}
          textareaProps={{ placeholder: "Nombre colegio", rows: 3 }}
          options={{ required: "Este campo es requerido" }}
          className="my-2 w-full"
        />
        <TextAreaField
          label="Default Textarea"
          name="name2"
          variant="default"
          form={form}
          textareaProps={{ placeholder: "Nombre colegio", rows: 3 }}
          options={{ required: "Este campo es requerido" }}
          className="my-2 w-full"
        />
        <TextAreaField
          label="Nombr3"
          name="name3"
          variant="transparent"
          form={form}
          textareaProps={{ placeholder: "Nombre colegio", rows: 3 }}
          options={{ required: "Este campo es requerido" }}
          className="my-2 w-full"
        />
      </div>

      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2">
        <RadioGroupField
          name="permissions"
          radioOptions={permissionsRadioOptions}
          form={form}
          defaultValue={permissionsSelected}
          alignment="horizontal"
          color="blue-400"
        />
      </div>
      <Divider className="my-7" />

      <h6 className="subtitle2 text-blue-500">DATEPICKER & TIMEPICKER</h6>

      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2">
        <DateField
          form={form}
          name="date"
          label="Selecciona fecha"
          viewType="day"
          className="my-2 w-full"
        />

        <TimeField
          className="my-2 w-full"
          name="time_end"
          form={form}
          label="Selecciona el tiempo"
          options={{ required: "Debe seleccionar una hora inicial" }}
          muiTimePickerProps={{
            minutesStep: 45,
            ampm: false,
            ampmInClock: false,
          }}
        />
      </div>

      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2">
        <RangeDateField form={form} nameFrom="dateFrom" nameTo="dateTo" />
      </div>

      <Divider className="my-7" />

      <h6 className="subtitle2 text-blue-500">
        SELECTS CON OPCIONES ESTATICAS
      </h6>
      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2">
        <SelectField
          label="Tipo de establecimiento"
          name="type_establishment_id"
          form={form}
          className="my-2 w-full"
          selectOptions={[
            { label: "Educación privada", id: 1 },
            { label: "Educación pública", id: 2 },
          ]}
          optionLabel="label"
          optionValue="id"
        />
        <SelectField
          multiple
          label="Multiselect"
          name="multidemo"
          form={form}
          className="my-2 w-full"
          selectOptions={[
            { label: "Educación privada", id: 1 },
            { label: "Educación pública", id: 2 },
          ]}
          optionLabel="label"
          optionValue="id"
        />
      </div>

      <Divider className="my-7" />

      <h6 className="subtitle2 text-blue-500">
        SELECTS CON OPCIONES DINAMICAS (DEL BACKEND)
      </h6>
      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2">
        <SelectField
          label="Región"
          name="region_id"
          form={form}
          className="my-2 w-full"
          options={{
            validate: (value) => value !== "" || "Este campo es requerido",
            onChange: (e) => filterProvinces(e.target.value),
          }}
          selectOptions={regions ?? []}
          optionLabel="name"
          optionValue="id"
        />

        <SelectField
          label="Provincia"
          name="province_id"
          form={form}
          className="my-2 w-full"
          options={{
            validate: (value) => value !== "" || "Este campo es requerido",
            onChange: (e) => filterCommunes(e.target.value),
          }}
          selectOptions={
            provinces && form.watch("region_id") !== "" ? provinces : []
          }
          optionLabel="name"
          optionValue="id"
        />
      </div>
      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2">
        <SelectField
          label="Comuna"
          name="commune_id"
          form={form}
          className="my-2 w-full"
          options={{
            validate: (value) => value !== "" || "Este campo es requerido",
          }}
          selectOptions={
            communes && form.watch("province_id") !== "" ? communes : []
          }
          optionLabel="name"
          optionValue="id"
        />
      </div>

      <Divider className="my-7" />

      {/* <h6 className="subtitle2 text-blue-500">DATEPICKER & TIMEPICKER</h6>

      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2">
        <DateField
          form={form}
          name="date"
          label="Selecciona fecha"
          viewType="day"
          className="my-2 w-full"
        />

        <TimeField
          className="my-2 w-full"
          name="time_end"
          form={form}
          label="Selecciona el tiempo"
          options={{ required: "Debe seleccionar una hora inicial" }}
          muiTimePickerProps={{
            minutesStep: 45,
            ampm: false,
            ampmInClock: false,
          }}
        />
      </div>

      <Divider className="my-7" /> */}

      <h6 className="subtitle2 text-blue-500">AUTOCOMPLETE</h6>

      <AutocompleteField
        form={form}
        name="autocompelete"
        autocompleteOptions={
          autocompleteOpts
            ? autocompleteOpts.map((item) => ({
                label: `${item.code} - ${item.name}`,
                value: String(item.id),
              }))
            : []
        }
        options={{ onChange: (value) => onSelectAutocompleteOpt(value) }}
      />
      {/* <Autocomplete
        id="teaching_type_id"
        onChange={(e, value) => onSelectAutocompleteOpt(value)}
        value={{ label: "", value: "" }}
        freeSolo
        clearOnBlur
        isOptionEqualToValue={(option, value) => option.value === value.value}
        noOptionsText="No se encontraron resultados"
        getOptionLabel={(option) => option.label}
        options={
          autocompleteOpts
            ? autocompleteOpts.map((item) => ({
                label: `${item.code} - ${item.name}`,
                value: String(item.id),
              }))
            : []
        }
        renderInput={({
          InputProps: { ref: anchorListRef },
          inputProps: muiInputProps,
        }) => (
          <div ref={anchorListRef} className="mt-4 max-w-xs shadow-16">
            <ForwardedGenericInput
              icon={<PdvIcons name="Search" color="teal-500" />}
              name="teaching_type_id"
              inputProps={{ ...muiInputProps, placeholder: "Buscar..." }}
            />
          </div>
        )}
      /> */}
    </form>
  );
};

export default GeneralForm;

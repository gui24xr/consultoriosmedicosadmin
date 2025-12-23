-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "BiologicalSex" AS ENUM ('MASCULINE', 'FEMININE', 'NULL_OR_UNSPECIFIED');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('REGULAR', 'ADDITIONAL', 'URGENT');

-- CreateEnum
CREATE TYPE "AppointmentPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'NOT_AVAILABLE', 'SUSPENDED', 'FINISHED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'ABSENT', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('IN_PROGRESS', 'IN_CONSULTATION', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'OTHER',
    "email" TEXT,
    "phone" TEXT,
    "whatsAppNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressData" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "street" TEXT,
    "number" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "state" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AddressData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "activationCode" TEXT,
    "recoveryCode" TEXT,
    "recoveryCodeExpires" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "record" TEXT,
    "birthDate" TIMESTAMP(3),
    "emergencyContactPhone" TEXT,
    "emergencyContactName" TEXT,
    "emergencyContactRelationship" TEXT,
    "hasClinicHistory" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medic" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "inService" BOOLEAN NOT NULL DEFAULT true,
    "dni" TEXT NOT NULL,
    "record" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Medic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicHistory" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "number" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ClinicHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientMedicalData" (
    "id" TEXT NOT NULL,
    "clinicHistoryId" TEXT NOT NULL,
    "bloodType" TEXT,
    "biologicalSex" "BiologicalSex" DEFAULT 'NULL_OR_UNSPECIFIED',
    "genderIdentity" TEXT DEFAULT '',
    "allergies" TEXT,
    "medicalHistory" TEXT,
    "currentMedication" TEXT,
    "familyMedicalHistory" TEXT,
    "personalMedicalHistory" TEXT,
    "surgicalHistory" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PatientMedicalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicHistoryPost" (
    "id" TEXT NOT NULL,
    "medicId" TEXT NOT NULL,
    "clinicHistoryId" TEXT NOT NULL,
    "consultationId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "followUp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ClinicHistoryPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationService" (
    "id" TEXT NOT NULL,
    "inService" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT,
    "description" TEXT,
    "medicId" TEXT,
    "specialtyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ConsultationService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "type" "AppointmentType" NOT NULL DEFAULT 'REGULAR',
    "startDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "consultationServiceId" TEXT NOT NULL,
    "consultationId" TEXT,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "patientId" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "statusLastModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT '',
    "patientId" TEXT NOT NULL,
    "medicId" TEXT NOT NULL,
    "consultationServiceId" TEXT NOT NULL,
    "appointmentId" TEXT,
    "clinicHistoryPostId" TEXT,
    "status" "ConsultationStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MedicToSpecialty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_dni_key" ON "Person"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "AddressData_dni_key" ON "AddressData"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_code_key" ON "Patient"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_dni_key" ON "Patient"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_record_key" ON "Patient"("record");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_code_key" ON "Specialty"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Medic_code_key" ON "Medic"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Medic_dni_key" ON "Medic"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Medic_record_key" ON "Medic"("record");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicHistory_dni_key" ON "ClinicHistory"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicHistory_number_key" ON "ClinicHistory"("number");

-- CreateIndex
CREATE UNIQUE INDEX "PatientMedicalData_clinicHistoryId_key" ON "PatientMedicalData"("clinicHistoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicHistoryPost_consultationId_key" ON "ClinicHistoryPost"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_consultationId_key" ON "Appointment"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "Consultation_appointmentId_key" ON "Consultation"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Consultation_clinicHistoryPostId_key" ON "Consultation"("clinicHistoryPostId");

-- CreateIndex
CREATE UNIQUE INDEX "_MedicToSpecialty_AB_unique" ON "_MedicToSpecialty"("A", "B");

-- CreateIndex
CREATE INDEX "_MedicToSpecialty_B_index" ON "_MedicToSpecialty"("B");

-- AddForeignKey
ALTER TABLE "AddressData" ADD CONSTRAINT "AddressData_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Person"("dni") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Person"("dni") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Person"("dni") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medic" ADD CONSTRAINT "Medic_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Person"("dni") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicHistory" ADD CONSTRAINT "ClinicHistory_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Patient"("dni") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedicalData" ADD CONSTRAINT "PatientMedicalData_clinicHistoryId_fkey" FOREIGN KEY ("clinicHistoryId") REFERENCES "ClinicHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicHistoryPost" ADD CONSTRAINT "ClinicHistoryPost_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "Medic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicHistoryPost" ADD CONSTRAINT "ClinicHistoryPost_clinicHistoryId_fkey" FOREIGN KEY ("clinicHistoryId") REFERENCES "ClinicHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationService" ADD CONSTRAINT "ConsultationService_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "Medic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationService" ADD CONSTRAINT "ConsultationService_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_consultationServiceId_fkey" FOREIGN KEY ("consultationServiceId") REFERENCES "ConsultationService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "Medic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_consultationServiceId_fkey" FOREIGN KEY ("consultationServiceId") REFERENCES "ConsultationService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_clinicHistoryPostId_fkey" FOREIGN KEY ("clinicHistoryPostId") REFERENCES "ClinicHistoryPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicToSpecialty" ADD CONSTRAINT "_MedicToSpecialty_A_fkey" FOREIGN KEY ("A") REFERENCES "Medic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicToSpecialty" ADD CONSTRAINT "_MedicToSpecialty_B_fkey" FOREIGN KEY ("B") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

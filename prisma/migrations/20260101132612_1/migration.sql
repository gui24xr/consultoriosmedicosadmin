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
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "record" TEXT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "whatsAppNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressData" (
    "id" TEXT NOT NULL,
    "street" TEXT,
    "number" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "state" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "customerId" TEXT NOT NULL,

    CONSTRAINT "AddressData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
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
    "customerId" TEXT,
    "providerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "inService" BOOLEAN NOT NULL DEFAULT true,
    "dni" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "whatsAppNumber" TEXT,
    "record" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "CaseHistory" (
    "id" TEXT NOT NULL,
    "number" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "customerId" TEXT NOT NULL,

    CONSTRAINT "CaseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseHistoryPost" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "responsibleFirstName" TEXT NOT NULL,
    "responsibleLastName" TEXT NOT NULL,
    "responsibleRecord" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "caseHistoryId" TEXT NOT NULL,

    CONSTRAINT "CaseHistoryPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestation" (
    "id" TEXT NOT NULL,
    "inService" BOOLEAN NOT NULL DEFAULT true,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "providerId" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Prestation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "type" "AppointmentType" NOT NULL DEFAULT 'REGULAR',
    "startDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "prestationId" TEXT NOT NULL,
    "consultationId" TEXT,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "customerId" TEXT NOT NULL,
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
    "customerId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "prestationId" TEXT NOT NULL,
    "appointmentId" TEXT,
    "clinicHistoryPostId" TEXT,
    "status" "ConsultationStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "emergencyContactPhone" TEXT,
    "emergencyContactName" TEXT,
    "emergencyContactRelationship" TEXT,
    "gender" "Gender" NOT NULL DEFAULT 'OTHER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "customerId" TEXT NOT NULL,
    "hasClinicHistory" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientMedicalData" (
    "id" TEXT NOT NULL,
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
    "patientId" TEXT NOT NULL,

    CONSTRAINT "PatientMedicalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntityCounter" (
    "entity" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "format" TEXT NOT NULL DEFAULT '{prefix}_{seq:4}',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntityCounter_pkey" PRIMARY KEY ("entity")
);

-- CreateTable
CREATE TABLE "_ProviderToSpecialty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_code_key" ON "Customer"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_record_key" ON "Customer"("record");

-- CreateIndex
CREATE UNIQUE INDEX "AddressData_customerId_key" ON "AddressData"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_customerId_key" ON "User"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_code_key" ON "Provider"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_dni_key" ON "Provider"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_record_key" ON "Provider"("record");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_code_key" ON "Specialty"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CaseHistory_number_key" ON "CaseHistory"("number");

-- CreateIndex
CREATE UNIQUE INDEX "CaseHistory_customerId_key" ON "CaseHistory"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Prestation_code_key" ON "Prestation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_consultationId_key" ON "Appointment"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "Consultation_appointmentId_key" ON "Consultation"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Consultation_clinicHistoryPostId_key" ON "Consultation"("clinicHistoryPostId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_dni_key" ON "Patient"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_customerId_key" ON "Patient"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "PatientMedicalData_patientId_key" ON "PatientMedicalData"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProviderToSpecialty_AB_unique" ON "_ProviderToSpecialty"("A", "B");

-- CreateIndex
CREATE INDEX "_ProviderToSpecialty_B_index" ON "_ProviderToSpecialty"("B");

-- AddForeignKey
ALTER TABLE "AddressData" ADD CONSTRAINT "AddressData_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseHistory" ADD CONSTRAINT "CaseHistory_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseHistoryPost" ADD CONSTRAINT "CaseHistoryPost_caseHistoryId_fkey" FOREIGN KEY ("caseHistoryId") REFERENCES "CaseHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_prestationId_fkey" FOREIGN KEY ("prestationId") REFERENCES "Prestation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_prestationId_fkey" FOREIGN KEY ("prestationId") REFERENCES "Prestation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedicalData" ADD CONSTRAINT "PatientMedicalData_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToSpecialty" ADD CONSTRAINT "_ProviderToSpecialty_A_fkey" FOREIGN KEY ("A") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToSpecialty" ADD CONSTRAINT "_ProviderToSpecialty_B_fkey" FOREIGN KEY ("B") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

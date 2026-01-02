'use client'
import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

interface NotificationOptions {
  title: string
  description: string
  duration?: number
  type?: NotificationType
}

export default function useNotification() {
  // Usar la API estática que persiste cuando el componente se desmonta
  const showNotification = ({
    title,
    description,
    duration = 10,
    type = 'info',
  }: NotificationOptions) => {
    notification[type]({
      title: title,
      description,
      duration,
      placement: 'topRight',
    })
  }

  const showSuccess = (title: string, description: string, duration?: number) => {
    showNotification({ title, description, duration, type: 'success' })
  }

  const showError = (title: string, description: string, duration?: number) => {
    showNotification({ title, description, duration, type: 'error' })
  }

  const showWarning = (title: string, description: string, duration?: number) => {
    showNotification({ title, description, duration, type: 'warning' })
  }

  const showInfo = (title: string, description: string, duration?: number) => {
    showNotification({ title, description, duration, type: 'info' })
  }

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
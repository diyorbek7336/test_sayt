'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface Service {
  id: number
  title: string
  description: string
  icon: string
}

interface SelectedServicesContextType {
  selectedServices: Service[]
  addService: (s: Service) => void
  removeService: (id: number) => void
  clearServices: () => void
}

const SelectedServicesContext = createContext<SelectedServicesContextType | null>(null)

export function SelectedServicesProvider({ children }: { children: ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<Service[]>([])

  const addService = useCallback((s: Service) => {
    setSelectedServices((prev) => {
      if (prev.find((x) => x.id === s.id)) return prev
      return [...prev, s]
    })
  }, [])

  const removeService = useCallback((id: number) => {
    setSelectedServices((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const clearServices = useCallback(() => setSelectedServices([]), [])

  return (
    <SelectedServicesContext.Provider
      value={{ selectedServices, addService, removeService, clearServices }}
    >
      {children}
    </SelectedServicesContext.Provider>
  )
}

export function useSelectedServices() {
  const ctx = useContext(SelectedServicesContext)
  if (!ctx) {
    return {
      selectedServices: [] as Service[],
      addService: () => {},
      removeService: () => {},
      clearServices: () => {},
    }
  }
  return ctx
}

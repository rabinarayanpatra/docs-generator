'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
}

interface TabProps {
  value: string
  label: string
  children: React.ReactNode
}

export function TabsComponent({ defaultValue, children }: TabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="my-6">
      {children}
    </Tabs>
  )
}

export function TabList({ children }: { children: React.ReactNode }) {
  return <TabsList className="mb-4">{children}</TabsList>
}

export function Tab({ value, label }: { value: string; label: string }) {
  return <TabsTrigger value={value}>{label}</TabsTrigger>
}

export function TabPanel({ value, children }: Omit<TabProps, 'label'>) {
  return (
    <TabsContent value={value} className="mt-0">
      {children}
    </TabsContent>
  )
}

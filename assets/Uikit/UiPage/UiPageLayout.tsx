import Link from 'next/link'
import { useState } from 'react'

import {
  ButtonsView,
  PdvCardContainerView,
  FormView,
  IconsView,
  ModalView,
  MultipleAccordionView,
  PaginationView,
  SimpleAccordionView,
  TabsView,
  TypographyView,
  ColorsView,
  TopHeaderCardView,
  LeftHeaderCardView,
  PillBoxView,
  PdvAlertView
} from './UiPageComponents'

const components = [
  { component: <ButtonsView />, tabText: `Buttons`, isSelected: true },
  { component: <FormView />, tabText: `Formularios` },
  { component: <TabsView />, tabText: `Tabs` },
  { component: <SimpleAccordionView />, tabText: `Acordion simple` },
  { component: <MultipleAccordionView />, tabText: `Acordion multiple` },
  { component: <PdvCardContainerView />, tabText: `Card container` },
  { component: <ModalView />, tabText: `Modal` },
  { component: <PaginationView />, tabText: `Paginación` },
  { component: <IconsView />, tabText: `Iconos` },
  { component: <ColorsView />, tabText: `Colores` },
  { component: <TypographyView />, tabText: `Tipografía` },
  { component: <TopHeaderCardView />, tabText: `TopHeaderCard` },
  { component: <LeftHeaderCardView />, tabText: `LeftHeaderCard` },
  { component: <PillBoxView />, tabText: `PillBox` },
  { component: <PdvAlertView />, tabText: `AlertBox` }
]

const UiKitLayout: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(components[0])

  return (
    <div className="h-screen bg-white px-8 pb-8">
      <div className="flex items-center justify-between py-2">
        <h4>UIKIT</h4>
        <Link href="/">X</Link>
      </div>
      <hr />
      <div className="mt-8 grid grid-cols-12" style={{ height: 'calc(100vh - 100px)' }}>
        <div className="col-span-2 overflow-auto border-r border-gray-200" style={{ height: 'calc(100vh - 100px)' }}>
          <h5 className="my-2">Componentes</h5>
          {components.map((iter) => (
            <div
              key={iter.tabText}
              className={`rounded-l-2xl py-2 pl-4 hover:bg-gray-25 ${
                selectedItem.tabText === iter.tabText ? 'bg-indigo-700 text-white hover:bg-indigo-700' : ''
              }`}
            >
              <p className={`m-0 cursor-pointer`} onClick={() => setSelectedItem(iter)}>
                {iter.tabText}
              </p>
            </div>
          ))}
        </div>

        <div className="col-span-10 overflow-auto px-8" style={{ height: 'calc(100vh - 100px)' }}>
          {selectedItem.component}
        </div>
      </div>
    </div>
  )
}

export default UiKitLayout

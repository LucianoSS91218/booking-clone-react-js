import { create } from "zustand";
import { devtools } from "zustand/middleware";

/*
type Mode = "CALENDAR" | "FLEXIBLE";

interface DateState {
  mode: Mode;
  checkIn: Date | null;
  checkOut: Date | null;
  selectedFlexible: string[]; // meses
  flexibleOption: string | null;
  setMode: (mode: Mode) => void;
  setCheckIn: (date: Date) => void;
  setCheckOut: (date: Date) => void;
  setSelectedFlexible: (months: string[]) => void;
  setFlexibleOption: (opt: string) => void;
}
*/
//por lo q hizo la ia lo mejor es actualizar el mode dependiendo si es flexible
// o checkin y checkout
export const useBookInOut = create()(
  devtools(
    (set, get) => ({
      mode: null,
      flexibleDate: [],
      displayMonths: [],
      checkInDate: { day: null, month: null, year: null },
      checkOutDate: { day: null, month: null, year: null },
      timedays: {
        dateOption: "Fechas Exactas",
        flexibleOption: null,
        mode: "calendar",
      },
      howmanytravelers: {
        group_adults: 1,
        group_children: 0,
        rooms: 1,
      },
      isActivePets: false,
      handleCheckIn: (day, month, year) => {
        const { checkInDate } = get();
        let newState = {};

        if (checkInDate.day === null) {
          newState = {
            mode: "calendar",
            checkInDate: { day: day, month: month, year: year },
            flexibleDate: [],
            displayMonths: [],
            timedays: {
              dateOption: "Fechas Exactas",
              flexibleOption: null,
              mode: "calendar",
            },
          };
        } else {
          newState = {
            mode: null,
            checkInDate: { day: null, month: null, year: null },
            checkOutDate: { day: null, month: null, year: null },
          };
        }

        set(() => newState);
      },

      handleCheckOut: (day, month, year) => {
        const { checkInDate, checkOutDate } = get();
        let newState = {};

        if (checkInDate.day && checkOutDate.day === null) {
          newState = {
            mode: "calendar",
            checkOutDate: { day: day, month: month, year: year },
            flexibleDate: [],
            displayMonths: [],
          };
        }

        set(() => newState);
      },

      handleFlexibleMonths: (value, month, year) => {
        const { flexibleDate, displayMonths } = get();
        let newState = [];
        let otherState = [];
        if (flexibleDate.includes(value)) {
          newState = flexibleDate.filter((v) => v !== value);
          otherState = displayMonths.filter(
            (f) => f.month !== month && f.year !== year
          );
        } else if (flexibleDate.length < 3) {
          newState = [...flexibleDate, value];
          otherState = [...displayMonths, { month: month, year: year }];
        }

        set({
          mode: "flexible",
          flexibleDate: newState,
          displayMonths: otherState,
          checkInDate: { day: null, month: null, year: null },
          checkOutDate: { day: null, month: null, year: null },
        });
      },

      handleTime: (type, value, mode) => {
        set((state) => ({
          timedays: {
            ...state.timedays,
            mode: mode,
            flexibleOption: mode === "calendar" ? null : "",
            dateOption: mode === "flexible" ? null : "",
            [type]: value,
          },
        }));
      },

      handleIncreaseTravelersRooms: (fieldId, newValue) =>
        set((state) => ({
          howmanytravelers: {
            ...state.howmanytravelers,
            [fieldId]: newValue,
          },
        })),

      togglePets: () => set((state) => ({ isActivePets: !state.isActivePets })),
    }),

    {
      name: "bookingdate",
    }
  )
);

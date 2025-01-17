import { create } from "zustand"
import { devtools, redux } from "zustand/middleware"
import { reducer } from "./reducer"

export const initialState = {
	user: null,
}

const useSwitchStore = create(
	devtools(redux(reducer, initialState), {
		name: "useSwitchStore",
		enabled:
			(typeof window !== "undefined" &&
				Boolean(window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"])) ||
			process.env.VERCEL_ENV !== "production",
	})
)

export default useSwitchStore

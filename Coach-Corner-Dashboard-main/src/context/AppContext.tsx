"use client";
import {
  Claims,
  Coachclaim,
  OrganizationItem,
  OrganizationObj,
  registerForm,
  SportObj,
  SubscriptionItem,
  TeamObj,
  toastType,
  User,
} from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import useCookie from "@/hooks/useCookie";
import {
  baseURL,
  fetchCookie,
  getOrderObject,
  hasClaim,
  isTokenExpired,
} from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useReducer } from "react";
import { toast } from "sonner";

type states = {
  isLoading: boolean;
  sidebarOpened: boolean;
  user: User | null;
  organization: OrganizationObj | null;
  organizations: OrganizationItem[] | null;
  sports: SportObj[] | null;
  teams: TeamObj[] | null;
  selectedTeam: TeamObj | null;
  selectedSport: SportObj | null;
  plan: SubscriptionItem | null;
  orderId: string | undefined;
  paymentIntent: string | undefined | null;
  paymentSecret: string | undefined | null;
  orderPlaced: boolean;
  orderFailed: boolean;
  isLoggedIn: boolean;
  tokenExpired: boolean;
  permissions: Coachclaim[] | null;
  logoutTrigger: boolean;
};
const initialState: states = {
  isLoading: true,
  sidebarOpened: false,
  user: null,
  organization: null,
  organizations: null,
  sports: null,
  teams: null,
  selectedTeam: null,
  selectedSport: null,
  plan: null,
  paymentIntent: undefined,
  paymentSecret: undefined,
  orderId: undefined,
  orderPlaced: false,
  orderFailed: false,
  tokenExpired: false,
  permissions: null,
  isLoggedIn: false,
  logoutTrigger: false,
};

const reducer = (state: states, action: any) => {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return { ...state, sidebarOpened: action.payload };
    case "SET_USER":
      const { user, isLoggedIn } = action.payload;
      return {
        ...state,
        user,
        isLoggedIn,
      };
    case "SET_EXPIRY":
      return {
        ...state,
        tokenExpired: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_SECRET":
      const { paymentIntent, paymentSecret, orderId } = action.payload;
      return {
        ...state,
        paymentIntent,
        paymentSecret,
        orderId,
      };
    case "SET_ORDER_ID":
      return {
        ...state,
        orderId: action.payload,
      };
    case "SET_ORDER_PLACED":
      return {
        ...state,
        orderPlaced: action.payload,
      };
    case "SET_ORDER_FAILED":
      return {
        ...state,
        orderFailed: action.payload,
      };
    case "SET_PERMISSIONS":
      return {
        ...state,
        permissions: action.payload,
      };
    case "SET_ORGANIZATION":
      return {
        ...state,
        organization: action.payload,
      };
    case "SET_ORGANIZATIONS":
      return {
        ...state,
        organizations: action.payload,
      };

    case "SET_SPORTS":
      return {
        ...state,
        sports: action.payload,
      };
    case "SET_SPORT":
      return {
        ...state,
        selectedSport: action.payload,
      };
    case "SET_TEAMS":
      return {
        ...state,
        teams: action.payload,
      };
    case "SET_TEAM":
      return {
        ...state,
        selectedTeam: action.payload,
      };
    case "SET_PLAN":
      return {
        ...state,
        plan: action.payload,
      };
    case "SET_LOGOUT":
      return {
        ...state,
        logoutTrigger: action.payload,
      };
    default: {
      return { ...state };
    }
  }
};

type loginData = {
  email: string;
  password: string;
};
interface EditorContextType extends states {
  openSidebar: (value: boolean) => void;
  setToaster: (type: toastType, message: string) => void;
  setClientSecret: (value: string | undefined | null) => void;
  setOrderFailed: (failed: boolean) => void;
  setOrderPlaced: (placed: boolean) => void;
  placeOrder: (data: registerForm) => void;
  completeOrder: () => void;
  cancelOrder: () => void;
  logIn: (data: loginData) => Promise<any>;
  logout: () => void;
  setLoading: (value: boolean) => void;
  setOrganization: (value: OrganizationObj | null) => void;
  setSports: (value: SportObj[] | null) => void;
  setTeams: (value: TeamObj[] | null) => void;
  setSelectedTeam: (value: TeamObj | null) => void;
  setSelectedSport: (value: SportObj | null) => void;
  toggleLogout: (value: boolean) => void;
  getActivePlan: () => Promise<void>;
  setOrgs: (value: OrganizationItem[] | null) => void;
}
const AppContext = createContext<EditorContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setCookie, deleteCookie, getCookie } = useCookie();
  const router = useRouter();
  const openSidebar = (value: boolean) => {
    dispatch({
      type: "OPEN_SIDEBAR",
      payload: value,
    });
  };
  const setClientSecret = (value: string | undefined | null) => {
    dispatch({
      type: "SET_CLIENT_SECRET",
      payload: value,
    });
  };
  const setOrderPlaced = (placed: boolean) => {
    dispatch({
      type: "SET_ORDER_PLACED",
      payload: placed,
    });
  };

  const setOrderFailed = (failed: boolean) => {
    dispatch({
      type: "SET_ORDER_FAILED",
      payload: failed,
    });
  };
  const setLoading = (value: boolean) => {
    dispatch({
      type: "SET_LOADING",
      payload: value,
    });
  };
  const setOrganization = (value: OrganizationObj | null) => {
    dispatch({
      type: "SET_ORGANIZATION",
      payload: value,
    });
  };
  const setOrgs = (value: OrganizationItem[] | null) => {
    dispatch({
      type: "SET_ORGANIZATIONS",
      payload: value,
    });
  };
  const setSports = (value: SportObj[] | null) => {
    dispatch({
      type: "SET_SPORTS",
      payload: value,
    });
  };
  const setSelectedSport = (value: SportObj | null) => {
    dispatch({
      type: "SET_SPORT",
      payload: value,
    });
  };
  const setTeams = (value: TeamObj[] | null) => {
    dispatch({
      type: "SET_TEAMS",
      payload: value,
    });
  };
  const setSelectedTeam = (value: TeamObj | null) => {
    dispatch({
      type: "SET_TEAM",
      payload: value,
    });
  };
  const setUser = async (user: any, isLoggedIn: boolean) => {
    if (user && user?.token) {
      const decoded: Claims = jwtDecode(user?.token);
      console.log("decoded", decoded);
      if (decoded) {
        if (
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] === "Admin"
        ) {
          //console.log("it is a admin", decoded);
          dispatch({
            type: "SET_USER",
            payload: { user, isLoggedIn },
          });
          dispatch({
            type: "SET_PERMISSIONS",
            payload: decoded?.Permission || null,
          });
          await setCookie(user);
        } else {
          dispatch({
            type: "SET_USER",
            payload: { user, isLoggedIn },
          });
          dispatch({
            type: "SET_PERMISSIONS",
            payload: decoded?.Permission || null,
          });
          await setCookie(user);
        }
      }
    } else {
      dispatch({
        type: "SET_USER",
        payload: { user, isLoggedIn },
      });
      deleteCookie();
    }
  };
  const setToaster = (type: toastType = "info", message: string) => {
    switch (type) {
      case "success":
        toast.success(message);
        return;
        break;
      case "error":
        toast.error(message);
        return;
      case "info":
        toast(message);
        return;
        break;
      default:
        toast(message);
        break;
    }
    return true;
  };
  const completeOrder = async () => {
    try {
      const res = await fetch(
        `${baseURL}/api/orders/complete?orderId=${state?.orderId}&paymentId=${state?.paymentIntent}`
      );
      console.log(res);
      if (res?.ok) {
        const result = await res?.json();
        console.log(result);
        return;
        if (result && result?.succeeded) {
          dispatch({
            type: "SET_SECRET",
            payload: result?.data,
          });
          setToaster(
            "success",
            "Order Placed Successfully. Pay your amount now."
          );
          return Promise.resolve(result);
        } else {
          console.log(result);
          return Promise.resolve(null);
        }
      } else {
        console.log(res);
        return Promise.resolve(null);
      }
    } catch (error) {
      console.log(error);
      return Promise.resolve(null);
    }
  };
  const cancelOrder = async () => {
    try {
      const res = await fetch(
        `${baseURL}/api/orders/cancel?orderId=${state?.orderId}`
      );
      console.log(res);
      if (res?.ok) {
        const result = await res?.json();
        console.log(result);
        return;
      } else {
        console.log(res);
        return Promise.resolve(null);
      }
    } catch (error) {
      console.log(error);
      return Promise.resolve(null);
    }
  };
  const placeOrder = async (data: registerForm) => {
    if (!data) return;
    try {
      const orderObj = getOrderObject(data);
      console.log(orderObj);
      const res = await fetch(`${baseURL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderObj),
      });
      if (res?.ok) {
        const result = await res?.json();
        console.log(result);
        if (result && result?.succeeded) {
          dispatch({
            type: "SET_SECRET",
            payload: result?.data,
          });
          setToaster(
            "success",
            "Order Placed Successfully. Pay your amount now."
          );
          return Promise.resolve(result);
        } else {
          console.log(result);
          return Promise.resolve(null);
        }
      } else {
        console.log(res);
        return Promise.resolve(null);
      }
    } catch (error) {
      console.log(error);
      return Promise.resolve(null);
    }
  };
  async function logIn(values: loginData) {
    try {
      const response = await fetch(`${baseURL}/api/accounts/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      //console.log(response,await response?.json());
      if (response?.ok) {
        const result = await response?.json();
        if (result && result?.succeeded) {
          setUser(result?.data, true);
          checkTokenExpiry(result?.data);
          router.push("/");
          router.refresh();
          return Promise.resolve(result);
        } else {
          console.log(result);
          setToaster("error", result?.messages[0] || "Something went wrong");
          return Promise.resolve(result);
        }
      } else {
        console.log(response);
        return Promise.resolve(response);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
  const logout = async () => {
    await setUser(null, false);
    await deleteCookie();
    await deleteCookie("orgId");
    await deleteCookie("teamId");
    router.push("/account/login?hardReload=true&rb=/");
    router.refresh();
    dispatch({
      type: "SET_LOGOUT",
      payload: false,
    });
  };
  const toggleLogout = (value: boolean) => {
    dispatch({
      type: "SET_LOGOUT",
      payload: value,
    });
  };
  const checkTokenExpiry = (user: any) => {
    const result = isTokenExpired(user);
    dispatch({
      type: "SET_EXPIRY",
      payload: result,
    });
  };
  const getActivePlan = async () => {
    try {
      const res = await fetchClient(`/api/Organization/Subscriptions/Active`);
      if (res && res?.succeeded) {
        const { data } = res;
        dispatch({
          type: "SET_PLAN",
          payload: data,
        });
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSports = async () => {
    try {
      const response = await fetchClient(`/api/sports/select`);
      if (response && response?.succeeded) {
        const { data } = response;
        //console.log(data);
        dispatch({
          type: "SET_SPORTS",
          payload: data,
        });
        dispatch({
          type: "SET_SPORT",
          payload: data[0],
        });
      } else {
        setToaster("error", response?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTeams = async () => {
    try {
      if (state?.selectedSport) {
        const res = await fetchClient(
          `/api/team/select?sportId=${state?.selectedSport?.id}`
        );
        if (res && res?.succeeded) {
          const { data } = res;
          dispatch({
            type: "SET_TEAMS",
            payload: data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getClaims = async (org: any) => {
    try {
      const response = await fetchClient(`/api/organization/claims`, {
        method: "GET",
        headers: {
          OrgId: org?.id,
        },
      });
      if (response && response?.succeeded) {
        const { data } = response;
        dispatch({
          type: "SET_ORGANIZATION",
          payload: data,
        });
        //console.log('here in the context data',data,hasClaim(data?.claims, "Permission.Teams.Create"))
        if(hasClaim(data?.claims, "Permission.Teams.Create")){
          await getActivePlan();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setDashboard = async (user: any) => {
    try {
      //console.log('inside setDashboard');
      const orgId: any = await fetchCookie("orgId");
      if (!orgId) {
        return Promise.resolve(false);
      }
      const teamId = await fetchCookie("teamId");
      if (teamId) {
        //console.log('selected team',JSON.parse(teamId));
        await setSelectedTeam(JSON.parse(teamId));
        await getClaims(JSON.parse(orgId));
        await getTeams();
      }
    } catch (error) {
      console.log(error);
    } finally {
      return Promise.resolve(false);
    }
  };
  useEffect(() => {
    const checkUserAndToken = async () => {
      await getSports();
      if (typeof window !== "undefined") {
        //let oldUser = window.localStorage.getItem("ccsda");
        let oldUser = fetchCookie();
        if (oldUser) {
          const parsed = JSON.parse(oldUser);
          await setUser(parsed, true);
          await checkTokenExpiry(oldUser);
          const check = await setDashboard(parsed);
          dispatch({
            type: "SET_LOADING",
            payload: check,
          });
        } else {
          setUser(null, false);
          //router.push("/account/login?hardReload=true");
          setTimeout(() => {
            dispatch({
              type: "SET_LOADING",
              payload: false,
            });
          }, 1500);
        }
      }
    };

    checkUserAndToken();
  }, []);

  // useEffect(() => {
  //   // Check if organizations or teams do not exist and redirect
  //   if (!state?.organization || !state?.teams || !state?.selectedTeam) {
  //     console.log('triggered the redirect form the app context.','the states are now',state)
  //     router.push("/organizations");
  //   }
  // }, [state?.organization, state?.teams,state?.selectedTeam]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        openSidebar,
        setToaster,
        setClientSecret,
        setOrderFailed,
        setOrderPlaced,
        completeOrder,
        cancelOrder,
        placeOrder,
        logIn,
        logout,
        setLoading,
        setOrganization,
        setSports,
        setTeams,
        setSelectedTeam,
        setSelectedSport,
        toggleLogout,
        getActivePlan,
        setOrgs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

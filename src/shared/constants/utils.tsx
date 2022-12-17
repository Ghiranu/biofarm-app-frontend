import {
  ContentPasteOutlined,
  FactCheck,
  GroupsOutlined,
  ListOutlined,
  LogoutOutlined,
  NotificationsOutlined,
  SupportAgentOutlined,
  SubscriptionsOutlined,
} from "@mui/icons-material";
import { UserRole } from "core/types/enums";
import { ColumnDefinitionType } from "shared";

export const SCROLL_TYPE = {
  AUTO: "auto",
  HIDDEN: "hidden",
  VISIBLE: "visible",
};

// export const MANDATORY_HEADINGS = CONTACT_HEADINGS.filter(
// 	(heading) => heading.mandatory,
// ).map((heading) => heading.colName)
// export const REMAINING_HEADINGS = CONTACT_HEADINGS.filter(
// 	(heading) => !heading.mandatory,
// ).map((heading) => heading.colName)

export const PATHS = {
  PRODUCTS: "/products",
  ORDERS: "/orders",
  SUBSCRIPTION: "/subscription",
  LOGOUT: "/logout",
};

export const MAIN_MENU_ITEMS = [
  {
    text: "Products",
    icon: <ListOutlined />,
    path: PATHS.PRODUCTS,
    roles: Object.values(UserRole),
  },
  {
    text: "Orders",
    icon: <FactCheck />,
    path: PATHS.ORDERS,
    roles: Object.values(UserRole),
  },
  {
    text: "Subscriptions",
    icon: <SubscriptionsOutlined />,
    path: PATHS.SUBSCRIPTION,
    roles: Object.values(UserRole),
  },
  {
    text: "Logout",
    icon: <LogoutOutlined />,
    path: PATHS.LOGOUT,
    roles: Object.values(UserRole),
  },
];

// export const AGENT_TEAM_COORDINATORS_OVERVIEW_COLUMNS: ColumnDefinitionType<
// 	AgentModel,
// 	keyof AgentModel
// >[] = [
// 	{
// 		colName: 'Nume Prenume',
// 		dbName: 'name',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'KID',
// 		dbName: 'kid',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Categorie personal',
// 		dbName: 'personnelCategory',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Nivel',
// 		dbName: 'level',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Clasa contact',
// 		dbName: 'contactClass',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Actiune contact',
// 		dbName: 'contactAction',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'MB',
// 		dbName: 'mb',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Autoritate',
// 		dbName: 'authorities',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Judet',
// 		dbName: 'county',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'CRC',
// 		dbName: 'crc',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Solutii',
// 		dbName: 'solutions',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Echipe',
// 		dbName: 'teams',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Segment client',
// 		dbName: 'clientSegment',
// 		mandatory: true,
// 	},
// ]

// export const ADMIN_OVERVIEW_COLUMNS: ColumnDefinitionType<
// 	AdminDTO,
// 	keyof AdminDTO
// >[] = [
// 	{
// 		colName: 'Nume Prenume',
// 		dbName: 'name',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'KID',
// 		dbName: 'kid',
// 		mandatory: true,
// 	},
// 	{
// 		colName: 'Echipa',
// 		dbName: 'team',
// 		mandatory: true,
// 	},
// ]

export const rows: any[] = [
  {
    id: 1,
    number: "AB1",
    processingType: "some_processing_type",
    company: "Test",
    partner: "some_partner",
    name: "some_name",
    type: "type1",
    customerInfo: "info1",
    accountClass: "AB1",
    division: "A",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "MB",
    nrOfDaysUntilResponseDeadline: -12,
    responseDeadline: "2022-10-10",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
  {
    id: 2,
    number: "AB2",
    processingType: "some_processing_type2",
    company: "Test2",
    partner: "some_partner2",
    name: "some_name2",
    type: "type2",
    customerInfo: "info2",
    accountClass: "AB2",
    division: "B",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "Reveniri",
    nrOfDaysUntilResponseDeadline: -12,
    responseDeadline: "2022-10-10",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
  {
    id: 3,
    number: "AB3",
    processingType: "some_processing_type3",
    company: "Test3",
    partner: "some_partner3",
    name: "some_name3",
    type: "type3",
    customerInfo: "info3",
    accountClass: "AB3",
    division: "B",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "Autoritate",
    nrOfDaysUntilResponseDeadline: -2,
    responseDeadline: "2022-10-10",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
  {
    id: 4,
    number: "AB4",
    processingType: "some_processing_type4",
    company: "Test4",
    partner: "some_partner4",
    name: "some_name4",
    type: "type4",
    customerInfo: "info4",
    accountClass: "AB4",
    division: "B",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "Altceva",
    nrOfDaysUntilResponseDeadline: -2,
    responseDeadline: "2022-10-10",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
  {
    id: 5,
    number: "AB5",
    processingType: "some_processing_type5",
    company: "Test5",
    partner: "some_partner5",
    name: "some_name5",
    type: "type5",
    customerInfo: "info5",
    accountClass: "AB5",
    division: "B",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "Altceva",
    nrOfDaysUntilResponseDeadline: 2,
    responseDeadline: "2022-10-12",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
  {
    id: 6,
    number: "AB6",
    processingType: "some_processing_type6",
    company: "Test6",
    partner: "some_partner6",
    name: "some_name6",
    type: "type6",
    customerInfo: "info6",
    accountClass: "AB6",
    division: "B",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "Altceva",
    nrOfDaysUntilResponseDeadline: 1,
    responseDeadline: "2022-10-11",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
  {
    id: 7,
    number: "AB7",
    processingType: "some_processing_type7",
    company: "Test7",
    partner: "some_partner7",
    name: "some_name7",
    type: "type7",
    customerInfo: "info7",
    accountClass: "AB7",
    division: "B",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "Altceva",
    nrOfDaysUntilResponseDeadline: 12,
    responseDeadline: "2022-10-22",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
  {
    id: 8,
    number: "AB8",
    processingType: "some_processing_type8",
    company: "Test8",
    partner: "some_partner8",
    name: "some_name8",
    type: "type8",
    customerInfo: "info8",
    accountClass: "AB8",
    division: "B",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "Altceva",
    nrOfDaysUntilResponseDeadline: 10,
    responseDeadline: "2022-10-20",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
  {
    id: 9,
    number: "AB9",
    processingType: "some_processing_type9",
    company: "Test9",
    partner: "some_partner9",
    name: "some_name9",
    type: "type9",
    customerInfo: "info9",
    accountClass: "AB9",
    division: "B",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "Altceva",
    nrOfDaysUntilResponseDeadline: 4,
    responseDeadline: "2022-10-14",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
  {
    id: 10,
    number: "AB10",
    processingType: "some_processing_type10",
    company: "Test10",
    partner: "some_partner10",
    name: "some_name10",
    type: "type10",
    customerInfo: "info10",
    accountClass: "AB10",
    division: "B",
    docRegistrationDate: "2022-10-10",
    createdBy: "Alex",
    createdAt: "2022-10-10",
    region: "RO",
    priority: "Altceva",
    nrOfDaysUntilResponseDeadline: 4,
    responseDeadline: "2022-10-14",
    contactClass: "dummy data",
    contactAction: "dummy data",
    createdDate: "dummy data",
  },
];

export const COLUMN_DROPDOWN_MESSAGES = {
  NO_MATCH: "Nu exista potriviri",
  NO_MORE_COLUMNS: "Toate coloanele au fost adaugate",
};

export const CONTACT_LOCALSTORAGE_KEYS = {
  COLUMNS: "contactColumns",
  REMAINING_COLUMNS: "remainingContactColumns",
};

export const PRIORITY = {
  AUTHORITY: "Autoritate",
  RETURN: "Reveniri",
  MB: "MB",
};

export const COLORS = {
  RED: {
    TEXT: "red",
    CSSVALUE: "#faa7a7",
  },
  YELLOW: {
    TEXT: "yellow",
    CSSVALUE: "#ebeb9d",
  },
  NONE: {
    TEXT: "none",
    CSSVALUE: "initial",
  },
};

export const ACCESS_TOKEN = "accessToken";

export const LOGIN_TYPE = {
  POPUP: "popup",
};

export const LOCALHOST = "localhost";

export const AUTH_URL =
  "https://app-eonintegration-contactsservice-dev.azurewebsites.net/contacts-service/users/current";

export const SECURITY_TOKEN = "Bearer";

export const CONTACT_SERVICE_PATH = "/contacts-service/contacts";

export const AUTH_SERVICE_PATH = "/contacts-service/users/current";

export const AGENT_TEAM_COORDINATOR_SERVICE_PATH = "/contacts-service/agents";

export const USER_INFO_KEY = "userInfo";

export const DEFAULT_TABLE_WIDTH = "100%";

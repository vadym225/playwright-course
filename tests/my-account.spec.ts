import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage"
import { getLoginToken } from "../api-calls/getLoginToken";

test("My Account using cookie injection", async ({ page }) => {
    const loginToken = await getLoginToken();
    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
})
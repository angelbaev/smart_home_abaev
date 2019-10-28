import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";

/**
 * https://docs.nativescript.org/ns-framework-modules/application-settings
 */
@Injectable({
    providedIn: "root"
})
export class StorageService {

    /**
     * @param key
     * @param value
     */
    setBoolean(key: string, value: boolean) {
        appSettings.setBoolean(key, value);
    }

    /**
     * @param key
     */
    getBoolen(key: string) {
        return appSettings.getBoolean(key, false);
    }

    /**
     * @param key
     * @param value
     */
    setString(key: string, value: string) {
        appSettings.setString(key, value);
    }

    /**
     * @param key
     */
    getString(key: string) {
        return appSettings.getString(key, "");
    }

    /**
     * @param key
     * @param value
     */
    setNumber(key: string, value: number) {
        appSettings.setNumber(key, value);
    }

    /**
     * @param key
     */
    getNumber(key: string) {
        return appSettings.getNumber(key, 0).toFixed(3);
    }

    /**
     * @param key
     */
    setObject(key: string, value: any) {
        appSettings.setString(key, JSON.stringify(value));
    }

    /**
     * @param key
     */
    getObject(key: string) {
        return JSON.parse(appSettings.getString(key, "{}"));
    }
    /**
     * @param key
     */
    hasKey(key: string) {
        return appSettings.hasKey(key);
    }

    /**
     * @param key
     */
    remove(key: string) {
        return appSettings.remove(key);
    }

    clear() {
        return appSettings.clear();
    }
}

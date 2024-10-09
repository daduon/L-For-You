<template src="./BTable.html"></template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
    name: "BTable",
    inheritAttrs: false,
    props: {
        headerData: {
            type: Object as PropType<any>,
            required: true,
        },
        
        list: {
            type: Array as PropType<any[]>,
            required: true,
            default: []
        },
    },
    data() {
        return {
            headersData: this.headerData,
            dataList: this.list as any[],
        };
    },
    watch: {
        headerData(newValue) {
            this.headersData = newValue;
        },

        list(newValue) {
            this.dataList = newValue;
        },
    },
    methods: {
        showSortIcon(sortBy: any) {
            if (sortBy === "") {
                return "ico_sort ascending";
            }
            if (sortBy) {
                return "ico_sort ascending";
            } else {
                return "ico_sort descending";
            }
        },

        checkSort(headerList: any[], header: any) {
            if (this.dataList.length === 0) return
            this.resetSort(headerList, header.key);
            header.sortBy = header.sortBy === "" ? true : header.sortBy ? false : true;
            this.onSortList(header.key, header.sortBy);
        },

        resetSort(headerList: any[], key: string) {
            headerList.forEach((data) => {
                if (key != data.key) {
                    data.sortBy = "";
                }
            });
        },

        onSortList(key: string, sortBy?: any) {
            if (this.dataList.length === 0) return
            this.dataList.sort((a, b) => {
                if (typeof a[key] === "number") {
                    if (sortBy) {
                        return b[key] - a[key];
                    } else {
                        return a[key] - b[key];
                    }
                } else if (typeof a[key] === "string") {
                    if (sortBy) {
                        return b[key].localeCompare(a[key]);
                    } else {
                        return a[key].localeCompare(b[key]);
                    }
                } else {
                    return this.dataList;
                }
            });
        },
    },
});
</script>
package com.example.skopje_maraton.model;

public enum Category {
    FIVE_KM("5km"), TEN_KM("10km"), HALF_MARATHON("half marathon"), MARATHON("marathon");

    final String value;

    Category(String value) {
        this.value = value;
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::table('profiles', function (Blueprint $table) {
        $table->string('country')->nullable()->after('bio');
        $table->string('university')->nullable()->after('country');
        $table->string('department')->nullable()->after('university');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
        $table->dropColumn(['country', 'university', 'department']);
    });
    }
};

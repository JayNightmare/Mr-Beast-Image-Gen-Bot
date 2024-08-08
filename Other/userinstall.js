module.exports = {
    date: {
        name: "userinstall",
        description: "User Install command",
        "integration_type": [
            0,
            1
        ],
        "contexts": [0, 1, 2]
    },
    async execute (interaction) {
        await interaction.reply({ content: `Working!`, ephemeral: true });
    }
}
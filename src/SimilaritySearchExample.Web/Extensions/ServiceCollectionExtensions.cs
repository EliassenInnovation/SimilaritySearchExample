﻿using Eliassen.Documents.Containers;
using Eliassen.MessageQueueing.Services;
using Eliassen.Search.Semantic;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ResourceProfiler.Web.Extensions.Documents.Containers;
using ResourceProfiler.Web.Extensions.MessageQueueing.Services;
using ResourceProfiler.Web.Extensions.Search.Semantic;

namespace ResourceProfiler.Web.Extensions;

public static class ServiceCollectionExtensions
{
    public const string MessageProviderKey = "postgresql";

    public static IServiceCollection AddApplicationBlobContainers(this IServiceCollection services)
    {
        services.AddTransient<IBlobContainerProviderFactory, ApplicationBlobContainerProviderFactory>();
        services.TryAddKeyedTransient<IBlobContainerProviderFactory, ApplicationBlobContainerProviderFactory>(MessageProviderKey);

        services.AddTransient<IMessageSenderProvider, ApplicationMessageQueueProvider>();
        services.TryAddKeyedTransient<IMessageSenderProvider, ApplicationMessageQueueProvider>(MessageProviderKey);

        services.AddTransient<IMessageReceiverProvider, ApplicationMessageQueueProvider>();
        services.TryAddKeyedTransient<IMessageReceiverProvider, ApplicationMessageQueueProvider>(MessageProviderKey);

        services.AddTransient<IVectorStoreProviderFactory, ApplicationVectorStoreProviderFactory>();
        services.TryAddKeyedTransient<IVectorStoreProviderFactory, ApplicationVectorStoreProviderFactory>(MessageProviderKey);

        return services;
    }
}
